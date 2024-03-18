import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ChartComponent = () => {
    const [data, setData] = useState([]);
    const [availableMonths, setAvailableMonths] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchData = async () => {
        try {
           
            const response = await axios.get(`http://127.0.0.1:8000/paiements?year=${selectedYear}`);

            
            const revenueByDay = {};
            const monthsSet = new Set();

            response.data.forEach(paiement => {
                const date = new Date(paiement.date_paiement);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const day = date.getDate();
                const montant = parseFloat(paiement.montant);

                if ((!selectedMonth || month === selectedMonth) && (!selectedYear || year === selectedYear)) {
                    const key = `${month}/${day}`;
                    if (revenueByDay[key]) {
                        revenueByDay[key] += montant;
                    } else {
                        revenueByDay[key] = montant;
                    }
                }
                monthsSet.add(month);
            });

           
            const chartData = Object.keys(revenueByDay).map(date => ({
                date,
                montant: revenueByDay[date]
            }));

            
            setData(chartData);
            setAvailableMonths(Array.from(monthsSet));
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center' }}>Variation du chiffre d'affaires par jour</h2>
            <Form>
                <Row>
                    <Col>
                        <Form.Control as="select" onChange={handleMonthChange}>
                            <option value="">Tous les mois</option>
                            {availableMonths.map(month => (
                                <option key={month} value={month}>{`Mois ${month}`}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control as="select" onChange={handleYearChange}>
                            <option value="">Toutes les années</option>
                            <option value={2024}>2024</option> {}
                        </Form.Control>
                    </Col>
                    <Col>
                        
                    </Col>
                    <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                        <Col>
                        
                        </Col>
                </Row>
            </Form>
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
