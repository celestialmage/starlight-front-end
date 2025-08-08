import { useState, useEffect } from 'react';

const Profile = () => {

    const { userData, setUserData } = useState({});

    useEffect(() => {
        
    })

    return (
        <>
            < ProfileDetails />
            < UserPosts />
        </>
    )

}

export default Profile;