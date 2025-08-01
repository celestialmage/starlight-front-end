import { useState, useEffect } from 'react';
import { fetchWithAuth, fetchTimeline } from "../utils/api"
import Post from './Post';
import './PostList.css';

const PostList = ({rerender, setFocusId, togglePostDetails}) => {

    const [posts, setPosts] = useState([]);
    const timeline = posts.reverse().map((post,index) => (
        < Post post={post} index={index} key={index} setFocusId={setFocusId} togglePostDetails={togglePostDetails} />
    ));

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