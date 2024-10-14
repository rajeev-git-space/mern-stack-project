// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Admin = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/projects/get-projects', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTransactions(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch transactions');
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard - Transactions</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <p>Freelancer: {transaction.freelancerName}</p>
                        <p>Project Owner: {transaction.projectOwnerName}</p>
                        <p>Project: {transaction.projectName}</p>
                        <p>Status: {transaction.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
