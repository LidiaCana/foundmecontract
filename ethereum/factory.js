import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
import { ADDRESS } from "./addressContract";

const instance = new web3.eth.Contract(CampaignFactory.abi, ADDRESS);
export default instance;
