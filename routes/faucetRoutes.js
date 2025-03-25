const express = require('express');
const router = express.Router();
const faucetController = require('../controllers/faucetController');

// Route pour la demande de faucet
router.post('/claim', faucetController.claimFaucet);

module.exports = router;
