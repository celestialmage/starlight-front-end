import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithAuth, fetchPostDetails } from '../utils/api';
import { timeAgo } from "../utils/utility"
import ReplyList from './ReplyList';
import './PostDetails.css';

const PostDetails = () => {

    const [ post, setPost ] = useState(null)
    const params = useParams()

    const setNewPost = (post) => {
        setPost(post);
    }

    useEffect(() => {

        fetchWithAuth(fetchPostDetails, params).then(setNewPost).then();

    }, [params])

    return post && (
        <div className='container'>
            <div className="expanded-post">
                <div className="post" id={post.id} >
                    <div className="post-head">
                        <div className="user-data">
                            <h3 className="post-display-name">{post.user.display_name}</h3>
                            <h4 className="post-user-name">@{post.user.username}</h4>
                        </div>
                        <div className="time-data">
                            <p className="post-timestamp">{timeAgo(post.time_posted)}</p>
                        </div>
                    </div>
                    <p className="post-text">{post.text}</p>
                    <h4 className='post-user-name'>{post.user_liked ? "liked" : "not liked"}</h4>
                </div>
                {post.replies && (
                    <div className="replies">
                        <ReplyList replies={post.replies} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;