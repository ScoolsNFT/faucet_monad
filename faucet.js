
app.post("/", async (req, res) => {
  const { address } = req.body;
  if (!address || !ethers.isAddress(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }
  if (!eligibleAddresses.has(address)) {
    return res.status(400).json({ error: "Your address is not eligible for the faucet." });
  }
  if (claimedAddresses.has(address)) {
    return res.status(400).json({ error: "You have already claimed once." });
  }

  try {
    console.log(`🔄 Sending 0.15 MON to ${address}...`);
    const tx = await wallet.sendTransaction({
      to: address,
      value: FAUCET_AMOUNT,
    });
    await tx.wait();
    console.log(`✅ Transaction confirmed: ${tx.hash}`);

    claimedAddresses.add(address);
    saveClaimedAddresses(claimedAddresses);

    res.json({
      message: "0.15 MON successfully sent!",
      txHash: tx.hash,
      fireworks: true,
    });
  } catch (error) {
    console.error("❌ Error sending transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Faucet is live at http://localhost:${PORT}`);
});

const express = require("express");
const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error("❌ ERROR: Missing private key! Add it to a .env file.");
  process.exit(1);
}
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const FAUCET_AMOUNT = ethers.parseUnits("0.15", 18);

const CLAIMED_FILE = "claimed.json";

function loadClaimedAddresses() {
  try {
    const data = JSON.parse(fs.readFileSync(CLAIMED_FILE, "utf8"));
    return new Set(data.map(addr => addr.toLowerCase())); // Convertir en minuscules
  } catch (error) {
    return new Set();
  }
}

function saveClaimedAddresses(addresses) {
  fs.writeFileSync(CLAIMED_FILE, JSON.stringify([...addresses], null, 2));
}

const claimedAddresses = loadClaimedAddresses();

const eligibleAddresses = new Set([
"0xbf7caa8716d9b872f45d01cab4f05f1af91f3ff2",
"0x12f943c3a7cd2305ab4466bf50d09cd5561af53d",
"0x02e830aa23175c947b32e912008f684c426f4094",
"0xe37cb7c630cbf110b87073a538d871c7c8fb93d7",
"0xa90764d525a39c00877cee225baa3990f914004c",
"0x14d41a2cf4c69133507788cd6ee1d5809c845e2c",
"0xfe46abc2da7c8437dcfd9ffcd0213742400e2413",
"0x1739e13b1d8620516b2fc544b073150378d841a3",
"0x38da312828cbab38b88afb498e69283d99ecf478",
"0x8565be47f3b8173635661d369b0656cbcdacdac0",
"0x83ef08c2a19e664a6904d3a8b4e9eb455c71ae26",
"0x2d924090d4dfb5d4431ba2819be37369e2eb54db",
"0x1afdc34eb9e6f7b75f691e8237d008bb004ee9cd",
"0x707cb24739ace310909400b39b167cb4fa0fb4c1",
"0x1ceea33134257ba65cbce1b7de78cf7815073785",
"0xbe870ce9e7b55c940f8f27711444d5c5371df5f9",
"0x5212aab9463023131e4bfdec462d205550aa55cd",
"0x293a32bf2280b59586a06cdef3b7d36bf40d808e",
"0x8bc80630f03ebcced6a397d5b282d1e409c10c7b",
"0x74f109366b0c3d2171412c2a8fa7a298e0f64740",
"0xd51c2d11c1d574e124215276277fc012d80b2ed4",
"0xfa463f7606315319098b11a9567102421c432001",
"0x36e46f42d31b9dc5e689d9ced109ae1e04024f6f",
"0x707cb24739ace310909400b39b167cb4fa0fb4c1",
"0x194197b5d86ca319d2431853fcf5882b43936014",
"0x5de4e95220ba179f11dc1473980d3268e26f4858",
"0x5f5a9656ec5faa074351f043968eea0d1cc63589",
"0x032f55dced3ee70a2a3006ecc220d21e95077582",
"0x5d1171bdb3430733cefcac423cc363cdc267acb1",
"0x2fa2059a8158dd288c330438f1f8db86f91a0432",
"0x8325f5dcfddd1cbe48510df5430515ab106f78bd",
"0x7787e37c25926889a9ed81b66b9adae299a7e821",
"0xd52b997a032e9f0dded734bb84589d44c2ddae9b",
"0x7f55c115b2dc0beef42f7a48628b2391bfb0ef2b",
"0x8445eaba549f062300ef96a385de2f838c4e0df4",
"0xf0cf6d0ff930b025d83e82be866198b402cda53b",
"0x3491d8a71e0ed87ca061cf1307be335bd052e2c4",
"0x5297d5fb8f4fff7c27e29307575cca2b3fbd6ac4",
"0xb00c147f9f0bbf5ffd5c5429608575cc55b428e0",
"0x5a9a1ee3f5a43aa3ee14732f759a85bfe8d1b348",
"0x5f5a9656ec5faa074351f043968eea0d1cc63589",
"0x9d7fe13325f68179e9f770e705bc5a23f3b8a9e6",
"0x408f03ee5394bf90786c5ebb1658e8946da4c907",
"0x92b6f0e3a6159b8a8cb884f1e192e2cd451d97db",
"0xb1b5fe66152882dfcceb8662a2da879dd1e852b0",
"0x5d645644eaf689ec059fefcf5e5c41b9704a9d11",
"0xec93e03607ed84c00815ca972b72ef17a9830ddb",
"0x284d1e6e887fa9fd8271b7b8943bfa91287dedb0",
"0x84b82956e2852e9de0c144ab5b975876d1f4e959",
"0x8d2d2259d4f05020ed15a69f57aa3b96b238fc57",
"0xf8d5705a16ca12bd8eb93b06aea84227a4fc6f3a",
"0xf0cf6d0ff930b025d83e82be866198b402cda53b",
"0xf3382100a0e2262c3762f6968011ce09aa178e04",
"0x86bef24e4624ae331d5967fa869793b56f878c16",
"0xfcc1b39a32804aed4e98c922a202a0aded0995be",
"0xaffe3f3177bbc8dbdd85a393a9e2f92fd37eeb0",
"0x8619a3bfbd78dda1b0c33ae06ca45d8ae276b6b0",
"0x2482e633ab14c32ef2c9c1edc8ee4e1171d08adb",
"0x3a10fae6da5487e8cedf7a2012a7fc45dc7bd878",
"0x39df80ad33a7fd0bec56e41a101f8dde4023654f",
"0xdea4c3c329f23c5fa19fc80ad11cea4c36dbf990",
"0x4a0677f38919cac63d5fbae37a0a93922ae66604",
"0x1636cd3879b7ca66a9ec52196d313530c5bf7163",
"0x4427e4c61f88b871f0cba5857233b8a6e0f912e6"
]);

app.post("/", async (req, res) => {
  const { address } = req.body;
  if (!address || !ethers.isAddress(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }

  const userAddress = address.toLowerCase(); // Convertir l'adresse en minuscules

  if (!eligibleAddresses.has(address)) {
    return res.status(400).json({ error: "Your address is not eligible for the faucet." });
  }
  if (claimedAddresses.has(userAddress)) {
    return res.status(400).json({ error: "You have already claimed once." });
  }

  try {
    console.log(`🔄 Sending 0.15 MON to ${address}...`);
    const tx = await wallet.sendTransaction({
      to: address,
      value: FAUCET_AMOUNT,
    });
    await tx.wait();
    console.log(`✅ Transaction confirmed: ${tx.hash}`);

    claimedAddresses.add(userAddress); // Ajouter en minuscules
    saveClaimedAddresses(claimedAddresses);

    res.json({
      message: "0.15 MON successfully sent!",
      txHash: tx.hash,
      fireworks: true,
    });
  } catch (error) {
    console.error("❌ Error sending transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Faucet is live at http://localhost:${PORT}`);
});
