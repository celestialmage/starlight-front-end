import { useNavigate } from "react-router-dom";
import './User.css';

const User = ({user}) => {

    const nav = useNavigate();

    const goToProfile = () => {
        nav(`/${user.username}`);
    }

    return (
        <div className="user" onClick={goToProfile}>
            <div className="user-head">
                <h3 className="user-display-name">{user.display_name}</h3>
                <h4 className="user-user-name">{user.username}</h4>
            </div>
            <div className="user-info">
                <p className="user-bio">{user.bio}</p>
            </div>
            <div className="user-statistics">
                <p className="user-following-count">{user.following_count} Following</p>
                <p className="user-follower-count">{user.follower_count} Followers</p>
            </div>
        </div>
    );
}

export default User;