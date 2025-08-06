import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import LogoutButton from "./LogoutButton";
import PostList from "./PostList";
import PostForm from "./PostForm";
import './Landing.css';
import PostDetails from '../post/PostDetails';
import Home from './Home';
import { fetchWithAuth, fetchPostDetails } from '../utils/api';

const Landing = () => {
    const nav = useNavigate();

    const [rerender, setRerender] = useState(true);
    const [renderPost, setRenderPost] = useState(false);
    const [focusPost, setFocusPost] = useState({});

    const togglePostDetails = async (postId) => {
        const post = await fetchWithAuth(fetchPostDetails, { postId: postId });

        setFocusPost(post);
        setRenderPost(!renderPost);

        console.log(rerender, focusPost);
    };

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') === null) {
            return nav('/login');
        }
    });

    return (
        <div>
            <div className='container'>
                < Home  setRerender={setRerender} />
                < PostList 
                    rerender={rerender} 
                    togglePostDetails={togglePostDetails}
                />
            </div>
        </div>
    )
};

export default Landing;