import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ChiffreAffaireCalculator() {
  const [paiements, setPaiements] = useState([]);
  const [chiffreAffaireParDate, setChiffreAffaireParDate] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/paiements')
      .then(response => response.json())
      .then(data => setPaiements(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const chiffreAffaireParDateCalculé = {};

    // Calcul du chiffre d'affaires par date
    paiements.forEach(paiement => {
      const date = paiement.date_paiement.split(' ')[0]; // Extrait la date sans l'heure
      chiffreAffaireParDateCalculé[date] = (chiffreAffaireParDateCalculé[date] || 0) + paiement.montant;
    });

    setChiffreAffaireParDate(chiffreAffaireParDateCalculé);
  }, [paiements]);

  useEffect(() => {
    // Destruction du graphique existant avant de créer un nouveau
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Création du nouveau graphique
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(chiffreAffaireParDate).map(date => formatDate(date)), // Utilise les dates formatées comme étiquettes
        datasets: [{
          label: 'Chiffre d\'affaires par date',
          data: Object.values(chiffreAffaireParDate),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Chiffre d\'affaires (€)'
            },
            beginAtZero: true
          }
        }
      }
    });

    // Assignation de l'instance du graphique au ref
    chartRef.current = myChart;
  }, [chiffreAffaireParDate]);

  // Fonction pour formater la date au format souhaité
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR'); // Formatage de la date en format local français
  };

  return (
    <div>
      <h2>Calculateur de Chiffre d'Affaire par Date</h2>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default ChiffreAffaireCalculator;
