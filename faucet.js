// Importation des librairies
const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config(); // Chargement des variables d'environnement

// Initialisation de l'application Express
const app = express();
app.use(express.json());

// Configuration du provider et du wallet
const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz"); // Remplace avec ton RPC

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Stocke ta clé privée dans un fichier .env !
if (!PRIVATE_KEY) {
    console.error("❌ ERREUR: Clé privée manquante ! Ajoute-la dans un fichier .env");
    process.exit(1);
}

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const FAUCET_AMOUNT = ethers.parseUnits("0.15", 18); // 0.15 MON

// Stockage des adresses qui ont déjà réclamé (1 seule fois par adresse)
const claimedAddresses = new Set();

// Route pour réclamer des fonds
app.post('/claim', async (req, res) => {
    const { address } = req.body;

    // Vérification de l'adresse
    if (!address || !ethers.isAddress(address)) {
        return res.status(400).json({ error: "Adresse invalide" });
    }

    // Vérifie si l'adresse a déjà réclamé
    if (claimedAddresses.has(address)) {
        return res.status(400).json({ error: "Vous avez déjà réclamé une fois." });
    }

    try {
        console.log(`🔄 Envoi de 0.15 MON à ${address}...`);

        // Création et envoi de la transaction
        const tx = await wallet.sendTransaction({
            to: address,
            value: FAUCET_AMOUNT
        });

        // Attendre la confirmation
        await tx.wait();
        console.log(`✅ Transaction confirmée: ${tx.hash}`);

        // Marquer l'adresse comme ayant réclamé
        claimedAddresses.add(address);

        res.json({ message: "0.15 MON envoyés avec succès!", txHash: tx.hash });
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi:", error);
        res.status(500).json({ error: error.message });
    }
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Faucet actif sur http://localhost:${PORT}`);
});
