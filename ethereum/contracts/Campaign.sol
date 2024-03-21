// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CampaignFactory {
    address[] public deployedCampaigns;
    constructor() {}
    function createCampaign(uint __minumContribution) public {
        address newContract = address(
            new Campaign(__minumContribution, msg.sender)
        );
        deployedCampaigns.push(newContract);
    }
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
contract Campaign {
    struct Request {
        string description;
        uint value;
        bool completed;
        address payable recipiet;
        uint aprobalCount;
        mapping(address => bool) approvers;
    }
    address public manager;
    uint public minimunContribution;
    mapping(address => bool) public approvers;
    Request[] requests;
    uint approversCount;

    constructor(uint _minumContribution, address creator) {
        manager = creator;
        minimunContribution = _minumContribution;
        approversCount = 0;
    }

    modifier restrict() {
        require(msg.sender == manager);
        _;
    }
    function contribute(uint contribution) public payable {
        require(contribution > minimunContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    function createRequest(
        string memory _reason,
        uint _value,
        address payable _recipiet
    ) public restrict {
        Request storage newRequest = requests.push();
        newRequest.description = _reason;

        newRequest.value = _value;
        newRequest.recipiet = _recipiet;
        newRequest.completed = false;
        newRequest.aprobalCount = 0;
    }
    function approveRequest(uint requestIndex) public {
        Request storage request = requests[requestIndex];

        require(approvers[msg.sender]);
        require(!request.approvers[msg.sender]);

        request.approvers[msg.sender] = true;
        request.aprobalCount++;
    }
    function finalizeRequest(uint requestIndex) public restrict {
        Request storage requestSelected = requests[requestIndex];
        require(!requestSelected.completed);
        require(requestSelected.aprobalCount > (approversCount / 2));
        requestSelected.recipiet.transfer(requestSelected.value);
        requestSelected.completed = true;
    }
}
