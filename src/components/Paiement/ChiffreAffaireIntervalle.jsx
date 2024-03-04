import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function ChiffreAffaireIntervalle() {
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [chiffreAffaire, setChiffreAffaire] = useState(null);
    const [chartData, setChartData] = useState({});

    const handleChangeDateDebut = (event) => {
        setDateDebut(event.target.value);
    };

    const handleChangeDateFin = (event) => {
        setDateFin(event.target.value);
    };

    const handleCalculerChiffreAffaire = () => {
        axios.post('http://localhost:8000/paiements/chiffre_affaire', {
            date_debut: dateDebut,
            date_fin: dateFin
        })
        .then(response => {
            setChiffreAffaire(response.data.chiffre_affaire);

            // Construire les données pour le graphique
            const labels = Object.keys(response.data.chiffre_affaire_par_date);
            const data = Object.values(response.data.chiffre_affaire_par_date);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Chiffre d\'affaires',
                        data: data,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                    }
                ]
            });
        })
        .catch(error => {
            console.error('Error fetching chiffre d\'affaire:', error);
        });
    };

    return (
        <div className="container">
            <h2>Calculateur de Chiffre d'Affaire par intervalle de dates</h2>
            <div className="form-group">
                <label>Date de début :</label>
                <input type="date" className="form-control" value={dateDebut} onChange={handleChangeDateDebut} />
            </div>
            <div className="form-group">
                <label>Date de fin :</label>
                <input type="date" className="form-control" value={dateFin} onChange={handleChangeDateFin} />
            </div>
            <button className="btn btn-primary" onClick={handleCalculerChiffreAffaire}>Calculer</button>
            {chiffreAffaire !== null && (
                <p>Chiffre d'affaires pour l'intervalle de dates : {chiffreAffaire} €</p>
            )}
            {chartData.labels && (
                <div>
                    <h3>Graphique du chiffre d'affaires par date</h3>
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
}

export default ChiffreAffaireIntervalle;
