import { timeAgo } from "../utils/utility"

const Reply = ({reply}) => {
    return (
        <div className="reply" id={reply.id}>
            <div>
                <div>
                    <h3>{reply.user.display_name}</h3>
                    <h4>@{reply.user.username}</h4>
                </div>
                <div>
                    <p>{timeAgo(reply.time_posted)}</p>
                </div>
            </div>
            <p>{reply.text}</p>
        </div>
    )
}

export default Reply;