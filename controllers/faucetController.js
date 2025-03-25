const faucetService = require('../services/faucetService');
const { ethers } = require('ethers');

// Route pour gérer les demandes de faucet
exports.claimFaucet = async (req, res) => {
  const { address } = req.body;

  if (!address || !ethers.isAddress(address)) {
    return res.status(400).json({ error: "Adresse invalide" });
  }

  try {
    const result = await faucetService.sendFaucet(address);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
