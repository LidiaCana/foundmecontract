import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import campaign from "../../ethereum/campaign";
import {
  CardGroup,
  Divider,
  Grid,
  GridColumn,
  Header,
} from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import RequestForm from "../../components/RequestForm";
import TableRequest from "../../components/tableRequest/Table";
const Show = ({ details, requests }) => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const cardsSummary = [
    {
      meta: "Manager",
      description:
        "This is address who create the campaign, he can make request to withdraw money.",
      header: details.manager,
      style: { overflowWrap: "break-word" },
    },
    {
      header: details.minimumContribution,
      description:
        "This is the minimum contribution required to become an approver.",
      meta: "Minimum Contribution",
    },
    {
      meta: "Campaign Balance (ether)",
      description: "The balance is how much money the campaign recollect.",
      header: details.balance + " ether",
    },
    {
      meta: "Requests",
      description:
        "Number of request to try withdraw money from the contract to providers.",
      header: details.requestsCount,
    },
    {
      meta: "Approvers (Donators)",
      description:
        "This is the number of people who have donated to the campaign.",
      header: details.approversCount,
    },
  ];

  const fetchAddress = async () => {
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);
  };
  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <Layout>
      <Header as="h3" textAlign="left" color="purple">
        Contract {router.query.id}
      </Header>
      <Grid>
        <GridColumn width={10}>
          <CardGroup items={cardsSummary} />
        </GridColumn>
        <GridColumn width={6}>
          <Divider horizontal>New Contribution</Divider>
          <ContributeForm addressCampaign={router.query.id} />

          {details.manager === address && (
            <>
              <Divider horizontal>New Request</Divider>
              <RequestForm addressCampaign={router.query.id} />
            </>
          )}
        </GridColumn>
      </Grid>

      <Grid>
        <TableRequest requests={requests} />
      </Grid>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const campaignAddress = context.params.id;
  const campaignInstance = campaign(campaignAddress);
  const details = await campaignInstance.methods.getSummary().call();
  const requestCount = details[2];
  // const approversCount = await campaign(id).methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill(null)
      .map(async (element, index) => {
        const response = await campaignInstance.methods.requests(index).call();
        return {
          id: index,
          description: response[0],
          value: web3.utils.fromWei(response[1], "ether"),
          isCompleted: response[2],
          recipient: response[3],
          approvalCount: response[4].toString(),
          manager: details[4],
          campaignAddress: campaignAddress,
        };
      })
  );
  return {
    props: {
      details: {
        minimumContribution: details[0].toString(),
        balance: web3.utils.fromWei(details[1], "ether").toString(),
        requestsCount: details[2].toString(),
        approversCount: details[3].toString(),
        manager: details[4],
      },
      requests,
    },
  };
}
export default Show;
