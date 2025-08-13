import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewUser, editUser,fetchUserProfile, fetchWithAuth } from "../utils/api";
import UserForm from "./UserForm";
import './EditUser.css'

const EditUser = () => {

    const defaultForm = {
        displayName: '',
        username: '',
        bio: ''
    };

    const [ userData, setUserData ] = useState(defaultForm);
    const [ editPage, setEditPage ] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (params['username']) {

            const username = params['username'];
            fetchWithAuth(fetchUserProfile, { username })
            .then((response) => {
                const userForm = {
                    displayName: response.display_name,
                    username: response.username,
                    bio: response.bio
                };

                setUserData(userForm);
                setEditPage(true);
            });
        }
    }, [])

    return (
        <div className="container-edit-page">
            <div className="edit">
                <h2>enter your account information</h2>
                {!editPage && < UserForm token={params['userToken']} userData={userData} submitFunction={createNewUser} />}
                {editPage && < UserForm userData={userData} submitFunction={editUser} />}
            </div>
        </div>
    )

}

export default EditUser;