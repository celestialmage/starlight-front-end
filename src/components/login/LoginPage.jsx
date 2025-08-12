import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { loginUser } from '../utils/api'
import './LoginPage.css';

const LoginPage = () => {    

    const nav = useNavigate();

    const handleLogin = async (response) => {

        const loginResponse = await loginUser(response);

        if (loginResponse === "New User") {

            console.log("I think we should go.")
            nav(`/signup/${response.credential}`);
        } else {
            nav('/');
        }
    }

    useEffect(() => {

        localStorage.removeItem('StarlightAccessToken');
        localStorage.removeItem('StarlightRefreshToken'); 

        if (localStorage.getItem('StarlightRefreshToken') !== null) {
            nav("/");
        }
    });

    return (
        <div className="container">
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