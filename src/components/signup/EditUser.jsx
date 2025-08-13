import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewUser, editUser,fetchUserProfile, fetchWithAuth } from "../utils/api";
import UserForm from "./UserForm";
import './EditUser.css'
import { jwtDecode } from "jwt-decode";

const EditUser = () => {

    const defaultForm = {
        id: '',
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
                    id: response.id,
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
                <h2>{!editPage ? 'enter your account information' : 'edit profile'}</h2>
                {!editPage && < UserForm token={params['userToken']} userData={userData} submitFunction={createNewUser} />}
                {editPage && < UserForm userData={userData} submitFunction={editUser} />}
            </div>
        </div>
    )

}

export default EditUser;