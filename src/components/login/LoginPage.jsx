import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { loginUser } from '../utils/api'
import './LoginPage.css';

const LoginPage = () => {

    const nav = useNavigate();

    const handleLogin = async (response) => {
        const response = await loginUser(response);

        if (response === false) {
            createNewUser(userToken);
        }
        nav('/');
    }

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') !== null) {
            nav("/");
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
        </div>
    )
};

export default LoginPage;