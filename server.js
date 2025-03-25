const express = require('express');
const app = express();
const faucetRoutes = require('./routes/faucetRoutes');

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes du faucet
app.use('/faucet', faucetRoutes);

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.send("Faucet Monad API en ligne 🚀");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Faucet is live at http://localhost:${PORT}`);
});
