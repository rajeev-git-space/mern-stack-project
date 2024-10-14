import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await api.get('/notifications');
            setNotifications(response.data);
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.map((notification) => (
                <div key={notification._id} className="notification-item">
                    <p>{notification.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Notifications;
