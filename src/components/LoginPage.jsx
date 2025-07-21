import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { saveTokens } from "../utils/utility";
const LoginPage = () => {

    const nav = useNavigate();

    const handleLogin = (response) => {
        const userToken = response.credential
        const credentials = {credential: userToken}
        axios.post('http://127.0.0.1:5000/api/login', credentials).then(response => {
            saveTokens(response);
            nav('/home');
        })
    }

    const checkTokens = () => {
        const accessToken = localStorage.getItem('StarlightAccessToken');
        const refreshToken = localStorage.getItem('StarlightRefreshToken');

        console.log(`Refresh token: ${refreshToken ? true : false}`);
        console.log(`Access token: ${accessToken ? true: false}`);
    }

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') !== null) {
            nav("/home");
        }
    });

    return (
        <div>
            <h1>Login/Signup with Google!</h1>
            <GoogleLogin 
                onSuccess={handleLogin}
                onError={(error) => {
                    console.log(error)
                }}
                auto_select={true}
            />
            <button onClick={checkTokens}>
                Nervous About Tokens?
            </button>
        </div>
    )
};

export default LoginPage;