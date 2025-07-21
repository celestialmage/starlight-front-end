import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "./LogoutButton";

const Landing = () => {
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('StarlightAccessToken');
        localStorage.removeItem('StarlightRefreshToken');
        nav('/login');
    }
    
    const handleDataPrint = () => {
        const userToken = localStorage.getItem('StarlightJWT')
        console.log(userToken);
        console.log(jwtDecode(userToken));
    }

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') === null) {
            return nav('/login');
        }
    })

    return (
        <div>
            < LogoutButton />
            <button onClick={handleDataPrint}>
                Get Your Data!
            </button>
            <p>meow</p>
        </div>
    )
};

export default Landing;