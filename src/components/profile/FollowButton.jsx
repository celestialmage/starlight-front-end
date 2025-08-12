import { useState } from 'react';
import { fetchWithAuth, followUser, unfollowUser } from "../utils/api";

const FollowButton = ({ user }) => {

    const [isFollowed, setIsFollowed] = useState(user.is_followed);

    let button;
    const options = { userId: user.id }

    const followCurrentUser = () => {

        fetchWithAuth(followUser, options)
            .then(user.is_followed = true)
            .then(setIsFollowed(true))
            // .then(console.log);
    }

    const unfollowCurrentUser = () => {
        fetchWithAuth(unfollowUser, options)
            .then(user.is_followed = false)
            .then(setIsFollowed(false));
            // .then(console.log);
    }

    if (!isFollowed) {
        button = <button className='follow-button' onClick={followCurrentUser} >Follow</button>;
    } else {
        button = <button className='unfollow-button' onClick={unfollowCurrentUser} >Unfollow</button>;
    }

    return button;
};

export default FollowButton;