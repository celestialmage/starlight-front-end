import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { loginUser } from '../utils/api'
const LoginPage = () => {

    const nav = useNavigate();

    const handleLogin = async (response) => {
        await loginUser(response)
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
            <div>
                {/* <button onClick={fakeLogin}>
                    Fake Login
                </button> */}
            </div>
        </div>
    )
};

export default LoginPage;