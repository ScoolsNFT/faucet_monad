// Import required libraries
const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config(); // Load environment variables

// Initialize Express app
const app = express();
app.use(express.json());

// Configure provider and wallet
const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz"); // Replace with your RPC

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Store your private key in a .env file!
if (!PRIVATE_KEY) {
    console.error("❌ ERROR: Missing private key! Add it to a .env file.");
    process.exit(1);
}

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const FAUCET_AMOUNT = ethers.parseUnits("0.15", 18); // 0.15 MON

// Track addresses that have already claimed (one claim per address)
const claimedAddresses = new Set();

// Faucet claim route
app.post('/claim', async (req, res) => {
    const { address } = req.body;

    // Validate address
    if (!address || !ethers.isAddress(address)) {
        return res.status(400).json({ error: "Invalid address" });
    }

    // Check if address has already claimed
    if (claimedAddresses.has(address)) {
        return res.status(400).json({ error: "You have already claimed once." });
    }

    try {
        console.log(`🔄 Sending 0.15 MON to ${address}...`);

        // Create and send transaction
        const tx = await wallet.sendTransaction({
            to: address,
            value: FAUCET_AMOUNT
        });

        // Wait for confirmation
        await tx.wait();
        console.log(`✅ Transaction confirmed: ${tx.hash}`);

        // Mark the address as claimed
        claimedAddresses.add(address);

        res.json({ message: "0.15 MON successfully sent!", txHash: tx.hash });
    } catch (error) {
        console.error("❌ Error sending transaction:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Faucet is live at http://localhost:${PORT}`);
});
