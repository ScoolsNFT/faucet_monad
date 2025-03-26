// claimfaucet.js
const axios = require("axios");
const { ethers } = require("ethers");

const faucetUrl = "https://scools-faucet-monad.onrender.com/";
const address = "0x39DF80AD33A7FD0bEc56E41a101F8Dde4023654F";

if (!ethers.isAddress(address)) {
    console.error("Adresse invalide.");
    process.exit(1);
}

axios.post(faucetUrl, { address })
    .then(response => {
        console.log("Faucet Response:", response.data);
        console.log("🎇 Félicitations ! Votre demande a été validée. 🎆");
    })
    .catch(error => {
        console.error("Erreur:", error.response ? error.response.data : error.message);
    });
