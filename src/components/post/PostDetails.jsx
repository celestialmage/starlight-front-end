import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth, fetchPostDetails } from '../utils/api';
import { timeAgo } from "../utils/utility"
import Home from '../home/Home';
import ReplyList from './ReplyList';
import ReplyForm from '../post/ReplyForm';
import LikeButton from '../timeline/LikeButton';
import './PostDetails.css';


const PostDetails = () => {

    const nav = useNavigate();

    const [ post, setPost ] = useState(null);
    const [ replies, setReplies ] = useState([]);
    const params = useParams()

    const addNewReply = (newReply) => {
        setReplies([...replies, newReply]);
    }

    const setNewPost = (post) => {
        setPost(post);
        setReplies(post.replies);
    };

    const directToProfile = () => {
        nav(`/${post.user.username}`)
    }

    useEffect(() => {

        fetchWithAuth(fetchPostDetails, params).then(setNewPost);

    }, [params])

    return post && (
        <div className='container'>
            < Home />
            <div className="expanded-post">
                <div className="post" id={post.id} >
                    <div className="post-head">
                        <div className="user-data">
                            <h3 className="post-display-name">{post.user.display_name}</h3>
                            <button className="button post-user-name" onClick={directToProfile}>@{post.user.username}</button>
                        </div>
                        <div className="time-data">
                            <p className="post-timestamp">{timeAgo(post.time_posted)}</p>
                        </div>
                    </div>
                    <p className="post-text">{post.text}</p>
                    < LikeButton post={post} />
                </div>
                < ReplyForm postId={post.id} addNewReply={addNewReply} />
                {post.replies && (
                    <div className="replies">
                        <ReplyList replies={replies} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;