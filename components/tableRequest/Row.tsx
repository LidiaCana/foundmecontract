import React from "react";
import { Button, TableCell, TableRow } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import campaign from "../../ethereum/campaign";
interface RowProps {
  id: string;
  description: string;
  value: string;
  recipient: string;
  approvalCount: string;
  manager: string;
  isCompleted: boolean;
  campaignAddress: string;
}

const Row = ({
  id,
  description,
  value,
  recipient,
  approvalCount,
  manager,
  isCompleted,
  campaignAddress,
}: RowProps) => {
  const accounts = web3.eth.getAccounts();
  const campaignContract = campaign(campaignAddress);
  const hanbleApprove = async (id: string) => {
    console.log(id);

    const accounts = await web3.eth.getAccounts();
    await campaignContract.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };
  const handleFinalize = (id: string) => {
    console.log(id);
  };
  return (
    <TableRow disabled={isCompleted}>
      <TableCell>{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{value}</TableCell>
      <TableCell>{recipient}</TableCell>
      <TableCell>{approvalCount}</TableCell>
      <TableCell>
        <Button positive onClick={() => hanbleApprove(id)}>
          Approve
        </Button>
      </TableCell>
      {/* Condition to render button only if is manager */}
      {manager === accounts[0] && (
        <TableCell>
          <Button onClick={() => handleFinalize(id)}>Finalize</Button>
        </TableCell>
      )}
    </TableRow>
  );
};
export default Row;
