const axios = require('axios');

const faucetUrl = "http://localhost:3000/claim"; // Make sure this is your correct URL
const address = "0x39DF80AD33A7FD0bEc56E41a101F8Dde4023654F";  // The address to receive MON tokens

axios.post(faucetUrl, { address })
  .then(response => {
    console.log("Faucet Response:", response.data);
  })
  .catch(error => {
    if (error.response) {
      // The server responded with an error status
      console.error("Server Response Error:", error.response.data);
    } else if (error.request) {
      // No response received
      console.error("No Response from Server:", error.request);
    } else {
      // Other errors
      console.error("Request Error:", error.message);
    }
  });
