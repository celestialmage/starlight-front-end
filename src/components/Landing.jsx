import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import LogoutButton from "./LogoutButton";
import PostList from "./PostList";
import PostForm from "./PostForm";
import './Landing.css';
import PostDetails from './PostDetails';
import Home from './Home';

const Landing = () => {
    const nav = useNavigate();

    const [rerender, setRerender] = useState(true);
    const [renderPost, setRenderPost] = useState(false);
    const [focusId, setFocusId] = useState(null);

    const togglePostDetails = () => {
        setRenderPost(!renderPost);
        console.log(focusId)
    };

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') === null) {
            return nav('/login');
        }
    });

    return (
        <div>
            <div>
                {renderPost && < PostDetails focusId={focusId}/>}
            </div>
            <div className='container'>
                < Home  setRerender={setRerender} />
                < PostList 
                    rerender={rerender} 
                    setFocusId={setFocusId} 
                    togglePostDetails={togglePostDetails}
                />
            </div>
        </div>
    )
};

export default Landing;