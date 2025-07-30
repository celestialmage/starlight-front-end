import { timeAgo } from "../utils/utility";
import './Post.css';

const Post = ({ post, index, togglePostDetails }) => {

    const handleClick = (postId) => {
        togglePostDetails(postId);
    };

    return (
        <div className="post" key={index} id={post.id} onClick={() => handleClick(post.id)} >
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
        </div>
    );
};

export default Post;