import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({ skills: '', achievements: '' });

    useEffect(() => {
        if (user) {
            setProfileData({ skills: user.skills || '', achievements: user.achievements || '' });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserProfile(profileData);
    };

    return (
        <div className="profile-container">
            <form onSubmit={handleSubmit}>
                <h2>Profile</h2>
                <textarea
                    placeholder="Skills"
                    value={profileData.skills}
                    onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                />
                <textarea
                    placeholder="Achievements"
                    value={profileData.achievements}
                    onChange={(e) => setProfileData({ ...profileData, achievements: e.target.value })}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
