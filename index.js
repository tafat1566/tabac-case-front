const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../client/public/produits'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Endpoint pour le téléchargement de photos
app.post('/upload', upload.single('photo'), (req, res) => {
  res.sendStatus(200); // Envoyer une réponse de réussite
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
