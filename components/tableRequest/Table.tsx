import React from "react";
import { Table } from "semantic-ui-react";
import Row from "./Row";

interface Request {
  id: string;
  description: string;
  value: string;
  recipient: string;
  approvalCount: string;
  manager: string;
  isCompleted: boolean;
  campaignAddress: string;
}
interface Props {
  requests: Request[];
}
const TableRequest = ({ requests }: Props) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Request ID</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Amount (ether)</Table.HeaderCell>
          <Table.HeaderCell>Recipient</Table.HeaderCell>
          <Table.HeaderCell>Approval Count</Table.HeaderCell>
          <Table.HeaderCell>Approve</Table.HeaderCell>
          <Table.HeaderCell>Finalize</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {requests.map((item, index) => (
          <Row key={index} {...item} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableRequest;
