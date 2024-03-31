import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xA2EC2f19377586a9e10e18899Fb6055FB9ff26AF"
);
export default instance;
