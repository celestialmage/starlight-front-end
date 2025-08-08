import { timeAgo } from "../utils/utility";
import './Reply.css';

const Reply = ({reply}) => {

    console.log("In Reply");
    return (
        <div className="reply" id={reply.id}>
            <p className="text username">@{reply.user.username}</p>
            <p className="text">{reply.text}</p>
        </div>
    )
}

export default Reply;