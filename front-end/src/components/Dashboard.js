// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ role }) => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {role === 'freelancer' ? 'Freelancer' : role === 'admin' ? 'Admin' : 'Project Owner'}! 
               {role === 'freelancer' ? 'Find projects and apply here.' : 
                role === 'admin' ? 'Monitor transactions here.' : 
                'Post projects and find freelancers here.'}
            </p>
            <nav>
                <ul>
                    {role === 'freelancer' && (
                        <li><Link to="/projects">Projects</Link></li>
                    )}
                    {role === 'admin' && (
                        <li><Link to="/admin">Admin Dashboard</Link></li>
                    )}
                    {role === 'project_owner' && (
                        <li><Link to="/project-owner">My Projects</Link></li>
                    )}
                </ul>
            </nav>
            <button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
