// server.js

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
app.use(fileUpload());

// Route de téléchargement d'image
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    // Obtenez le fichier envoyé
    const image = req.files.image;

    // Déplacez le fichier vers le dossier public
    const uploadPath = path.join(__dirname, 'public/test/', image.name);
    image.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('Fichier téléchargé avec succès.');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
