import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchWithAuth, fetchUserByUserId } from '../utils/api';

const ProfileButton = () => {
    
    const [username, setUsername] = useState();

    const nav = useNavigate();

    const goToProfile = () => {
        nav(`/${username}`);
    };

    useEffect(() => {
        fetchWithAuth(fetchUserByUserId).then(response => setUsername(response.username));
    })

    return (
        <button onClick={goToProfile}>
            Profile
        </button>
    );
};

export default ProfileButton;