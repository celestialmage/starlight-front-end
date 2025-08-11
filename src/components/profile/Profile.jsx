import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithAuth, fetchUserByUsername } from '../utils/api';
import PostsSelector from './PostsSelector';

const Profile = () => {

    const [ userData, setUserData ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const [ likes, setLikes ] = useState([]);
    const params = useParams();

    console.log(userData);

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
        // .then(console.log);
    }, [])

    return userData && (
        <div className='container'>
            {/* < ProfileDetails /> */}
            <div>
                < PostsSelector posts={posts} setPosts={setPosts} likes={likes} setLikes={setLikes} />
            </div>
            

        </div>
    )

}

export default Profile;