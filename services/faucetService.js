const { ethers } = require('ethers');
const { FAUCET_AMOUNT, wallet, claimedAddresses, eligibleAddresses } = require('../config/env');

// Fonction pour envoyer le faucet à l'adresse
exports.sendFaucet = async (address) => {
  // Vérification de l'éligibilité
  if (!eligibleAddresses.has(address)) {
    throw new Error("Votre adresse n'est pas éligible.");
  }

  if (claimedAddresses.has(address)) {
    throw new Error("Vous avez déjà réclamé une fois.");
  }

  // Envoi des fonds
  try {
    const tx = await wallet.sendTransaction({
      to: address,
      value: FAUCET_AMOUNT,
    });

    // Attendre la confirmation de la transaction
    await tx.wait();
    
    // Marquer l'adresse comme ayant réclamé
    claimedAddresses.add(address);
    
    return { message: "0.15 MON envoyé avec succès!", txHash: tx.hash };
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de la transaction: " + error.message);
  }
};
