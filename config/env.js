const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error("❌ ERROR: Missing private key! Add it to a .env file.");
  process.exit(1);
}

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const FAUCET_AMOUNT = ethers.parseUnits("0.15", 18);
const claimedAddresses = new Set();
const eligibleAddresses = new Set([
  // Ajoute ici tes adresses éligibles
]);

module.exports = {
  wallet,
  FAUCET_AMOUNT,
  claimedAddresses,
  eligibleAddresses,
};
