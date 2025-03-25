const axios = require('axios');
const { ethers } = require('ethers');  // Assure-toi que ethers est bien importé

const faucetUrl = "https://scools-faucet-monad.onrender.com/"; // URL de ton service en ligne
const address = "0x39DF80AD33A7FD0bEc56E41a101F8Dde4023654F";  // L'adresse à recevoir les tokens MON

// Vérifie si l'adresse est valide
if (!ethers.isAddress(address)) {  // Utilisation de ethers.isAddress
    console.error("L'adresse fournie est invalide");
    process.exit(1);
}

axios.post(faucetUrl, { address })
  .then(response => {
    console.log("Faucet Response:", response.data);
  })
  .catch(error => {
    if (error.response) {
      // Le serveur a répondu avec un statut d'erreur
      console.error("Server Response Error:", error.response.data);
    } else if (error.request) {
      // Pas de réponse reçue
      console.error("No Response from Server:", error.request);
    } else {
      // Autres erreurs
      console.error("Request Error:", error.message);
    }
  });
