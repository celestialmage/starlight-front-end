import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth, fetchPostDetails } from '../utils/api';
import { timeAgo } from "../utils/utility"
import ReplyList from './ReplyList';
import './PostDetails.css';
import ReplyForm from '../post/ReplyForm';
import LikeButton from '../timeline/LikeButton';

const PostDetails = () => {

    const nav = useNavigate();

    const [ post, setPost ] = useState(null);
    const [ replies, setReplies ] = useState([]);
    const params = useParams()

    const setNewPost = (post) => {
        setPost(post);
        setReplies(post.replies);
    };

    const addNewReply = (newReply) => {
        setReplies([...replies, newReply]);
    }

    useEffect(() => {

        fetchWithAuth(fetchPostDetails, params).then(setNewPost);

    }, [params])

    return post && (
        <div className='container'>
            <div className="expanded-post">
                <div className="post" id={post.id} >
                    <div className="post-head">
                        <div className="user-data">
                            <button className='back-button button' onClick={() => nav(-1)}>Back</button>
                            <h3 className="post-display-name">{post.user.display_name}</h3>
                            <h4 className="post-user-name">@{post.user.username}</h4>
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