import { convertToTimezone } from "../utils/utility";
import './Post.css';

const Post = ({ post, index }) => {
    return (
        <div className="post" key={index} id={index} >
            <div className="post-head">
                <h3 className="post-display-name">{post.user.display_name}</h3>
                <h4 className="post-user-name">@{post.user.username}</h4>
            </div>
            <p className="post-text">{post.text}</p>
            <p className="post-timestamp">{convertToTimezone(post.time_posted)}</p>
        </div>
    );
};

export default Post;