import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import LogoutButton from "./LogoutButton";
import PostList from "./PostList";
import PostForm from "./PostForm";
import './Landing.css';

const Landing = () => {
    const nav = useNavigate();

    const [rerender, setRerender] = useState(true);
    

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') === null) {
            return nav('/login');
        }
    })

    return (
        <div>
            <div className="menu">
                < PostForm setRerender={setRerender}/>
                < LogoutButton />
            </div>
            < PostList rerender={rerender}/>
        </div>
    )
};

export default Landing;