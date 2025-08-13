import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithAuth, fetchUserByUsername } from '../utils/api';
import ProfileDetails from './ProfileDetails';
import PostsSelector from './PostsSelector';
import Home from '../home/Home';
import './Profile.css';

const Profile = () => {

    const [ userData, setUserData ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const [ likes, setLikes ] = useState([]);
    const params = useParams();
    
    useEffect(() => {
        const username = params['username'];

        fetchWithAuth(fetchUserByUsername, { username })
        .then((response) => {
            setPosts(response.posts);
            setLikes(response.likes);

            delete response.posts;
            delete response.likes;

            setUserData(response);
        })
    }, [])

    return Object.keys(userData).length !== 0 && (
        <div className='container'>
            < Home />
            < ProfileDetails user={userData} />
            < PostsSelector posts={posts} setPosts={setPosts} likes={likes} setLikes={setLikes} />
        </div>
    )

}

export default Profile;