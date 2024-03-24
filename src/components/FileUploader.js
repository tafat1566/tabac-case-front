import React, { useState } from 'react';

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Veuillez sélectionner un fichier.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Fichier téléchargé avec succès.');
            } else {
                throw new Error('Erreur lors du téléchargement du fichier.');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier :', error);
            alert('Une erreur s\'est produite lors du téléchargement du fichier.');
        }
    };

    return (
        <div>
            <h2>Ajouter un fichier</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Télécharger</button>
            </form>
        </div>
    );
}

export default FileUploader;
