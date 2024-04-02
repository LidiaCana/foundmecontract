const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
//updated web3 and hdwallet-provider imports added for convenience
const compiledCampaign = require("./build/Campaign.json");
const compiledFactory = require("./build/CampaignFactory.json");
const addressPath = path.resolve(__dirname);
// deploy code will go here

const mnemonic = process.env.MNEMONIC_PHRASE,
  infuraKey = process.env.PROVIDER_URL;

const provider = new HDWalletProvider(mnemonic, infuraKey);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });
  provider.engine.stop();
  try {
    const jsonAddress = `export const ADDRESS = '${factory.options.address}'`;
    fs.writeFileSync(addressPath + "/addressContract.js", jsonAddress);
    console.log("Factory deployed to", factory.options.address);
  } catch (err) {
    console.log(err);
    console.log("Factory deployed to", factory.options.address);
  }
};
deploy();
