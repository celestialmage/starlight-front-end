import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FollowButton from "./FollowButton";
import './ProfileDetails.css';

const ProfileDetails = ({ user }) => {

    const nav = useNavigate();

    const accessToken = localStorage.getItem('StarlightAccessToken');
    const { sub } = jwtDecode(accessToken);

    let button;

    if (sub === user.id) {
        button = <button onClick={() => nav(`/${user.username}/edit`)}>Edit Profile</button>;
    } else {
        button = < FollowButton user={user} />
    }

    return user && (
        <div className='profile-details'>
            <div className="profile-head">
                <div className='user-details'>
                    <h3 className="user-display-name">{user.display_name}</h3>
                    <h4 className="user-username">@{user.username}</h4>
                    <p className='user-bio'>{user.bio}</p>
                </div>
                {button}
            </div>
            <div className='user-stats'>
                <p>{user.following_count} Following</p>
                <p>{user.follower_count} Followers</p>
            </div>
        </div>
    )

}

export default ProfileDetails;