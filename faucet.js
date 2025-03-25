// Import required libraries
const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config(); // Load environment variables

// Initialize Express app
const app = express();
app.use(express.json());

// Configure provider and wallet
const { ethers } = require('ethers');
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

// Predefined list of eligible addresses
const eligibleAddresses = new Set([
    "0xbf7caA8716d9B872f45d01CAb4f05f1AF91f3FF2",
    "0x12F943C3A7cd2305aB4466Bf50D09Cd5561Af53d",
"0x02E830aA23175C947b32E912008F684c426F4094",
"0xe37cB7C630cbF110b87073A538D871C7C8Fb93d7",
"0xa90764d525A39C00877CEe225bAA3990F914004C",
"0x14D41a2Cf4c69133507788Cd6eE1D5809c845e2c",
"0xfE46abc2Da7c8437DCfd9fFCD0213742400e2413",
"0x1739e13B1D8620516B2fc544b073150378d841a3",
"0x38DA312828cbab38bB8AFb498e69283D99Ecf478",
"0x8565BE47f3B8173635661d369B0656CBcdACDAC0",
"0x83Ef08C2a19E664A6904d3a8B4E9EB455C71AE26",
"0x2d924090D4dfB5D4431BA2819be37369e2eB54db", 
"0x1AFdc34eB9e6f7b75F691E8237d008Bb004Ee9Cd",
"0x707CB24739Ace310909400b39B167cb4fa0FB4c1",
"0x1cEea33134257ba65CbcE1B7DE78cf7815073785",
"0xBE870cE9E7B55C940F8F27711444d5C5371Df5f9",
"0x5212Aab9463023131E4BFDEc462D205550aa55Cd",
"0x293A32bF2280b59586A06CdEf3B7D36BF40d808E",
"0x8BC80630F03ebcCeD6A397D5b282d1E409C10C7b",
"0x74F109366B0C3d2171412c2a8fA7A298E0f64740",
"0xd51C2d11c1D574e124215276277Fc012D80b2ED4",
"0xfa463f7606315319098b11A9567102421C432001", 
"0x36e46f42d31b9dC5E689d9Ced109aE1E04024f6F",
"0x707CB24739Ace310909400b39B167cb4fa0FB4c1",
"0x194197b5D86CA319d2431853fCF5882b43936014",
"0x5De4E95220BA179f11dC1473980D3268e26f4858",
"0x5F5A9656EC5faa074351f043968eEA0d1cC63589",
"0x032F55Dced3ee70A2A3006eCc220D21E95077582",
"0x5d1171BDB3430733CEfcaC423cc363cDC267acB1",
"0x2Fa2059A8158dd288C330438F1f8db86f91a0432",
"0x8325F5DCfDDD1cbe48510DF5430515ab106f78Bd",
"0x7787e37c25926889a9eD81b66b9ADae299a7e821", 
"0xD52b997a032e9F0ddEd734BB84589D44c2DDAe9b",
"0x7f55C115B2dC0BEEf42F7a48628b2391bFb0ef2B",
"0x8445eABa549f062300EF96A385DE2F838C4E0dF4",
"0xF0cf6d0FF930b025D83E82bE866198B402CDa53B",
"0x3491D8A71E0Ed87Ca061Cf1307BE335bD052E2c4",
"0x5297D5fB8f4fff7C27e29307575cCa2b3fBD6Ac4",
"0xb00C147f9F0bbF5FfD5c5429608575cc55b428E0",
"0x5a9a1ee3F5a43aa3EE14732F759a85BFE8D1B348",
"0x5F5A9656EC5faa074351f043968eEA0d1cC63589",
"0x9D7fE13325f68179e9F770e705bc5A23F3b8a9e6", 
"0x408F03ee5394bF90786C5eBb1658e8946dA4C907",
"0x92b6F0e3a6159b8a8cb884f1e192E2cD451d97Db",
"0xb1b5fe66152882dfcceb8662a2da879dd1e852b0",
"0x5D645644eAf689eC059feFcF5e5c41b9704A9D11",
"0xEc93e03607Ed84c00815ca972B72EF17A9830dDb",
"0x284D1e6E887FA9FD8271B7B8943BFA91287dEdb0",
"0x84b82956e2852e9dE0C144ab5b975876D1F4E959",
"0x8d2d2259D4f05020eD15A69f57aA3B96b238FC57",
"0xf8d5705A16cA12bd8eB93B06aeA84227A4fC6F3a",
"0xF0cf6d0FF930b025D83E82bE866198B402CDa53B", 
"0xf3382100A0e2262c3762f6968011cE09Aa178e04", 
"0x86bef24E4624Ae331D5967Fa869793B56f878c16", 
"0xfcc1b39a32804aed4e98c922a202a0aded0995be", 
"0xaffe3F3177BBc8DbdDD85A393A9e2F92FD37EEb0", 
"0x8619A3bFBD78dDA1b0C33Ae06ca45D8Ae276B6b0", 
"0x2482E633aB14c32Ef2c9c1EdC8Ee4e1171D08ADb", 
"0x3a10Fae6da5487e8cEDF7a2012a7Fc45dc7BD878", 
    // Add more addresses here as needed
]);

// Faucet claim route
app.post('/claim', async (req, res) => {
    const { address } = req.body;

    // Validate address
    if (!address || !ethers.utils.isAddress(address)) {
        return res.status(400).json({ error: "Invalid address" });
    }

    // Check if the address is eligible
    if (!eligibleAddresses.has(address)) {
        return res.status(400).json({ error: "Your address is not eligible for the faucet." });
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
