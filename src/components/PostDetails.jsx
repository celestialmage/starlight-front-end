import { timeAgo } from "../utils/utility"
import ReplyList from './ReplyList';
import './PostDetails.css';

const PostDetails = ({ post, setRenderPost }) => {

    const handleClick = () => {
        setRenderPost(renderPost => !renderPost);
    };

    return (
        <div className="expanded-post" onClick={handleClick}>
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
            </div>
            <div className="replies">
                <ReplyList replies={post.replies} />
            </div>
        </div>
    );
};

export default PostDetails;