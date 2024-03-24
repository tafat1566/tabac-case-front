import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Form, Row, Col } from 'react-bootstrap';

const ChartComponent = () => {
    const [data, setData] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/paiements?year=${selectedYear}`);

                const revenueByDay = {};
                const monthsSet = new Set();

                response.data.forEach(paiement => {
                    const date = new Date(paiement.date_paiement);
                    const month = date.toLocaleString('default', { month: 'long' });
                    const day = date.getDate();
                    const montant = parseFloat(paiement.montant);
                    const color = getColor(montant);

                    if ((!selectedMonth || month === selectedMonth) && (!selectedYear || date.getFullYear() === selectedYear)) {
                        const key = `${day} ${month}`;
                        revenueByDay[key] = (revenueByDay[key] || 0) + montant;
                    }
                    monthsSet.add(month);
                });

                const chartData = Object.entries(revenueByDay).map(([date, montant]) => ({ date, montant }));

                setData(chartData);
                setAvailableMonths(Array.from(monthsSet));
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const getColor = (montant) => {
        if (montant < 100) {
            return '#ff7f0e'; // orange
        } else if (montant < 200) {
            return '#1f77b4'; // bleu
        } else {
            return '#2ca02c'; // vert
        }
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Variation du chiffre d'affaires par jour</h2>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Select onChange={handleMonthChange} style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#555', borderRadius: '8px', border: '1px solid #ccc' }}>
                            <option value="">Tous les mois</option>
                            {availableMonths.map((month, index) => (
                                <option key={index} value={month}>{`Mois de ${month}`}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select onChange={handleYearChange} style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#555', borderRadius: '8px', border: '1px solid #ccc' }}>
                            <option value="">Toutes les années</option>
                            <option value={2024}>2024</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            <ResponsiveContainer>
                <BarChart data={data} animationBegin={500}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#555' }} />
                    <YAxis style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#555' }} />
                    <Tooltip contentStyle={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#555', backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc' }} />
                    <Legend iconSize={16} wrapperStyle={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#555' }} />
                    <Bar dataKey="montant" fill="#4e79a7">
                        {data.map((entry, index) => (
                            <Bar key={index} fill={entry.color} label={{ position: 'top', content: `€${entry.montant.toFixed(2)}` }} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartComponent;
