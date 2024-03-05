import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer les données de l'API
                const response = await axios.get('http://127.0.0.1:8000/paiements');

                // Traiter les données pour obtenir la variation du chiffre d'affaires par jour
                const revenueByDay = {};

                response.data.forEach(paiement => {
                    const date = new Date(paiement.date_paiement).toLocaleDateString();
                    const montant = parseFloat(paiement.montant);

                    if (revenueByDay[date]) {
                        revenueByDay[date] += montant;
                    } else {
                        revenueByDay[date] = montant;
                    }
                });

                // Convertir les données en format requis par Recharts
                const chartData = Object.keys(revenueByDay).map(date => ({
                    date,
                    montant: revenueByDay[date]
                }));

                // Mettre à jour les données du composant
                setData(chartData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center' }}>Variation du chiffre d'affaires par jour</h2>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="montant" stroke="#ff0000" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartComponent;
