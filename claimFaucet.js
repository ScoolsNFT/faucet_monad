const axios = require('axios');
const { ethers } = require('ethers');

const faucetUrl = "https://scools-faucet-monad.onrender.com/";
const address = "0x39DF80AD33A7FD0bEc56E41a101F8Dde4023654F";

if (!ethers.isAddress(address)) {
    console.error("L'adresse fournie est invalide");
    process.exit(1);
}

axios.post(faucetUrl, { address })
  .then(response => {
    console.log("Faucet Response:", response.data);
  })
  .catch(error => {
    if (error.response) {
      console.error("Server Response Error:", error.response.data);
    } else if (error.request) {
      console.error("No Response from Server:", error.request);
    } else {
      console.error("Request Error:", error.message);
    }
  });
