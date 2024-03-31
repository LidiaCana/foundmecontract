import React from "react";
import factory from "../ethereum/factory";
import { Button, CardGroup } from "semantic-ui-react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Routes } from "../routes";

// Get the data returned from getServerSideProps as props
const renderCard = (campaigns) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <Link href={`/campaign/${address}`}>View Campaign</Link>,
      fluid: true,
    };
  });
  return <CardGroup items={items} />;
};
function Page({ campaigns }) {
  const router = useRouter();
  return (
    <Layout>
      <h1>Fund Me</h1>
      <Button
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary
        onClick={() => {
          router.push(Routes.NewCampaign);
        }}
      />
      {renderCard(campaigns)}
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      campaigns: await factory.methods.getDeployedCampaigns().call(),
    },
  };
}

export default Page;
