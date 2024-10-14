// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Freelancer Platform</h1>
            <p>
                <Link to="/login">Login</Link> | <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

export default HomePage;
