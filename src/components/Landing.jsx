import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import LogoutButton from "./LogoutButton";
import { createPost } from '../utils/api'
import PostList from "./PostList";

const Landing = () => {
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('StarlightAccessToken');
        localStorage.removeItem('StarlightRefreshToken');
        nav('/login');
    }
    
    const handleDataPrint = () => {
        const accessToken = localStorage.getItem('StarlightAccessToken');
        const refreshToken = localStorage.getItem('StarlightRefreshToken');

        console.log(`Refresh token: ${refreshToken ? true : false}`);
        console.log(`Access token: ${accessToken ? true: false}`);
    
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
            <button onClick={() => createPost()}>
                Make a silly post!
            </button>
            <p>meow</p>
            < PostList />
        </div>
    )
};

export default Landing;