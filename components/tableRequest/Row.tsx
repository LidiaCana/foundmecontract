import React from "react";
import { Button, TableCell, TableRow } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
interface RowProps {
  id: string;
  description: string;
  value: string;
  recipient: string;
  approvalCount: string;
  manager: string;
  onApprove: () => void;
  onFinalize: () => void;
}

const Row = ({
  id,
  description,
  value,
  recipient,
  approvalCount,
  onApprove,
  onFinalize,
  manager,
}: RowProps) => {
  const accounts = web3.eth.getAccounts();

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{value}</TableCell>
      <TableCell>{recipient}</TableCell>
      <TableCell>{approvalCount}</TableCell>
      <TableCell>
        <Button onClick={onApprove}>Approve</Button>
      </TableCell>
      {/* Condition to render button only if is manager */}
      {manager === accounts[0] && (
        <TableCell>
          <Button onClick={onFinalize}>Finalize</Button>
        </TableCell>
      )}
    </TableRow>
  );
};
export default Row;
