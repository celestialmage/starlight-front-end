import { useState, useEffect } from 'react';
import { fetchTimeline } from "../utils/api"

const PostList = () => {

    const convertToTimezone = (datestring) => {
        const date = new Date(datestring);

        const formatted = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
            hour12: true,
            }).format(date);

        return formatted;
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getTimeline = async () => {
            let timeline = await fetchTimeline();
            console.log(timeline);

            timeline = timeline.reverse().map(post => (
                <>
                    <h2>{post.user.display_name}</h2>
                    <h3>@{post.user.username}</h3>
                    <p>{post.text}</p>
                    <p>{convertToTimezone(post.time_posted)}</p>
                    <p>{post.time_posted}</p>
                </>
            ))

            setPosts(timeline);
        }

        getTimeline();
    }, []) 

    return (
        <div>
            {posts}
        </div>
    )
}   

export default PostList;