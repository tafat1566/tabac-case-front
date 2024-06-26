import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Form, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const ChartComponent = () => {
    const [data, setData] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [showFilters, setShowFilters] = useState(false);

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
                
                
                chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

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

    const handleShowFilters = () => {
        setShowFilters(!showFilters);
    };

    const getColor = (montant) => {
        if (montant < 100) {
            return '#ff7f0e'; 
        } else if (montant < 200) {
            return '#1f77b4'; 
        } else {
            return '#2ca02c'; 
        }
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Variation du chiffre d'affaires par jour</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="outline-secondary" onClick={handleShowFilters} style={{ marginRight: '10px' }}>
                    <FontAwesomeIcon icon={faFilter} /> Filtres
                </Button>
            </div>
            {showFilters && (
                <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Select onChange={handleMonthChange} style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#555', borderRadius: '8px', border: '1px solid #ccc' }}>
                                    <option value="">Tous les mois</option>
                                    {availableMonths.map((month, index) => (
                                        <option key={index} value={month}>{`Mois de ${month}`}</option>                                    ))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Select onChange={handleYearChange} style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#555', borderRadius: '8px', border: '1px solid #ccc' }}>
                                            <option value="">Toutes les années</option>
                                            <option value={2023}>2023</option>
                                            <option value={2024}>2024</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )}
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
                            <LabelList dataKey="montant" position="insideBottom" contentStyle={{ fontFamily: 'Georgia, serif', fontSize: '0.8rem', color: '#555' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            );
        };
        
        export default ChartComponent;
        
