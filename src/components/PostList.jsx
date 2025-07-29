import { useState, useEffect } from 'react';
import { fetchWithAuth, fetchTimeline } from "../utils/api"
import Post from './Post';
import './PostList.css';

const PostList = ({rerender}) => {

    const [posts, setPosts] = useState([]);
    const timeline = posts.map((post,index) => (
        < Post post={post} index={index} key={index} />
    ))

    useEffect(() => {
        const getTimeline = async () => {
            let timeline = await fetchWithAuth(fetchTimeline);

            setPosts(timeline);
        }

       getTimeline();
    }, [rerender]) 

    return (
        <div className={'timeline'} >
            {timeline}
        </div>
    )
}   

export default PostList;