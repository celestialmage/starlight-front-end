import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import LogoutButton from "./LogoutButton";
import PostList from "./PostList";
import PostForm from "./PostForm";
import './Landing.css';
import PostDetails from '../post/PostDetails';
import Home from './Home';
import Post from './Post';
import { fetchWithAuth, fetchTimeline } from '../utils/api';

const Landing = () => {
    const nav = useNavigate();

    const [posts, setPosts] = useState([]);

    const getTimeline = async () => {
        let timeline = await fetchWithAuth(fetchTimeline);

        setPosts(timeline);
    }

    const addNewPost = (post) => {

        setPosts([...posts, post]);
        getTimeline();
    }

    useEffect(() => {
        if (localStorage.getItem('StarlightRefreshToken') === null) {
            return nav('/login');
        }
        
       getTimeline();
    }, []);

    return (
        <div>
            <div className='container'>
                < Home addNewPost={addNewPost}/>
                < PostList 
                    posts={posts}
                    setPosts={setPosts}
                />
                {/* <div>
                    <p>

                    </p>
                </div> */}
            </div>
        </div>
    )
};

export default Landing;