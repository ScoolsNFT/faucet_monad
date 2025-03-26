const axios = require("axios");
const { ethers } = require("ethers");

const faucetUrl = "https://scools-faucet-monad.onrender.com/"; // Update with your actual faucet URL
const address = "0x39DF80AD33A7FD0bEc56E41a101F8Dde4023654F"; // Replace with the address you want to claim for

// Validate the address
if (!ethers.isAddress(address)) {
    console.error("Invalid address provided");
    process.exit(1);
}

axios
    .post(faucetUrl, { address })
    .then((response) => {
        console.log("Faucet Response:", response.data);
        console.log("\n🎆🎇 FIREWORKS CELEBRATION! 🎇🎆\n");
        console.log("✨✨✨✨✨✨✨✨✨✨");
        console.log("🎆 Congratulations! You have received 0.15 MON! 🎆");
        console.log("✨✨✨✨✨✨✨✨✨✨\n");
    })
    .catch((error) => {
        if (error.response) {
            console.error("Server Response Error:", error.response.data);
        } else if (error.request) {
            console.error("No Response from Server:", error.request);
        } else {
            console.error("Request Error:", error.message);
        }
    });