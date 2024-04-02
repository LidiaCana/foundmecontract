import React from "react";
import { Table } from "semantic-ui-react";
import Row from "./Row";

const TableRequest = ({}) => {
  const items = [
    {
      id: "Request ID",
      description: "Description",
      value: "Amount",
      recipient: "Recipient",
      approvalCount: "Approval Count",
      onApprove: () => console.log("Approve"),
      onFinalize: () => console.log("Finalize"),
      manager: "Manager",
    },
  ];
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Request ID</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Recipient</Table.HeaderCell>
          <Table.HeaderCell>Approval Count</Table.HeaderCell>
          <Table.HeaderCell>Approve</Table.HeaderCell>
          <Table.HeaderCell>Finalize</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item, index) => (
          <Row key={index} {...item} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableRequest;
