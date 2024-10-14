import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Logic to check if the user is already logged in
        const fetchUser = async () => {
            const response = await api.get('/auth/me');
            setUser(response.data);
        };
        fetchUser();
    }, []);

    const loginUser = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        setUser(response.data.user);
    };

    const updateUserProfile = async (profileData) => {
        const response = await api.put('/users/profile', profileData);
        setUser(response.data.user);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
