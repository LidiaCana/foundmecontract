const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
const compiledCampaign = require("../ethereum/build/Campaign.json");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory", () => {
    assert.ok(factory.options.address);
  });
  it("deploys a campaign", () => {
    assert.ok(campaign.options.address);
  });
  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it("allows people to contribute money and marks them as approvers", async () => {
    const min = await campaign.methods.minimunContribution().call();
    const contribution = min + 100n;
    await campaign.methods.contribute(contribution).send({
      value: contribution,
      from: accounts[1],
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
  it("requires a minimum contribution", async () => {
    const min = await campaign.methods.minimunContribution().call();
    const contribution = min - 100n;
    try {
      await campaign.methods.contribute(contribution).send({
        value: contribution,
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
