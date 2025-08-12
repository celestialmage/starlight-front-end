import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/utility";
import LikeButton from './LikeButton';
import './Post.css';

const Post = ({ post, index }) => {
    const nav = useNavigate();

    const handleClick = () => {
        nav(`/${post.user.username}/${post.id}`)
    };

    const directToProfile = (event) => {
        event.stopPropogation();
        nav(`/${post.user.username}`);
    }
    
    return (
        <div className="post" key={index} id={post.id} onClick={() => handleClick(post.id)} >
            <div className="post-head">
                <div className="user-data" onClick={(e) => directToProfile(e)}>
                    <h3 className="post-display-name">{post.user.display_name}</h3>
                    <h4 className="post-user-name">@{post.user.username}</h4>
                </div>
                <div className="time-data">
                    <p className="post-timestamp">{timeAgo(post.time_posted)}</p>
                </div>
            </div>
            <p className="post-text">{post.text}</p>
            <div className="button-container">
                <p className="reply-button">{post.reply_count} Replies</p>
                < LikeButton post={post} />
            </div>
        </div>
    );
};

export default Post;