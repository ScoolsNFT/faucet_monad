const axios = require('axios');

const faucetUrl = "http://localhost:3000/claim"; // Assure-toi que c'est bien ton URL
const address = "0x39DF80AD33A7FD0bEc56E41a101F8Dde4023654F";  // L'adresse à laquelle tu veux envoyer les MON

axios.post(faucetUrl, {
  address: address,
})
  .then(response => {
    console.log("Réponse du Faucet:", response.data);
  })
  .catch(error => {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.log("Erreur de la réponse du serveur:", error.response.data);
    } else if (error.request) {
      // Aucune réponse n'a été reçue
      console.log("Erreur de la requête:", error.request);
    } else {
      // Une autre erreur a eu lieu
      console.log("Erreur:", error.message);
    }
  });
