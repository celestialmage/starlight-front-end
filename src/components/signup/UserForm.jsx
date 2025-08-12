import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { checkUsernameAvailability, createNewUser } from "../utils/api";
import './UserForm.css'

const UserForm = ({ token }) => {

    const nav = useNavigate();

    const defaultForm = {
        displayName: '',
        username: '',
        bio: ''
    };

    const [ formData, setFormData ] = useState(defaultForm);
    const [ uniqueUsername, setUniqueUsername ] = useState(false);
    const [ approvedUsername, setApprovedUsername ] = useState('');
    const [ showMessage, setShowMessage ] = useState(false);

    const maxDisplayNameLength = 20;
    const maxUsernameLength = 15;
    const maxBioLength = 100;

    const invalidMessage = <p className='taken-username-message'>Username already taken! Please choose another.</p>

    const usernameRequirements = /^[A-Za-z0-9_]{4,15}$/;

    const checkUsername = () => {
        const username = formData.username;

        console.log(username);

        checkUsernameAvailability(username)
            .then((response) => {
                console.log(response);
                setUniqueUsername(response);
                if (response === true) {
                    setApprovedUsername(username);
                } else {
                    setShowMessage(true)
                }
            });
    };

    const handleChange = ({ target }) => {

        setFormData({
            ...formData,
            [target.name]: target.value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (usernameRequirements.test(formData.username) && formData.username === approvedUsername) {
            const finalUserData = {};
            const googleData = jwtDecode(token);

            finalUserData['display_name'] = formData.displayName;
            finalUserData['username'] = formData.username;
            finalUserData['bio'] = formData.bio;
            finalUserData['id'] = googleData.sub;
            finalUserData['email'] = googleData.email;
            createNewUser(token, finalUserData)
                .then(response => response.status === 201 ? nav(`/${finalUserData.username}`)  : console.log('failed'));
        } else {
            console.log('failed');
        }

        
        // fetchWithAuth(createNewUser, formData);
    }


    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <input 
                name='displayName'
                type='text'
                id='displayName'
                value={formData.displayName}
                onChange={handleChange}
                maxLength={maxDisplayNameLength}
                placeholder='display name'
                required
                autoComplete='off'
            />
            <input 
                name='username'
                type='text'
                id='username'
                value={formData.username}
                onChange={handleChange}
                maxLength={maxUsernameLength}
                placeholder='username'
                required
                autoComplete='off'
            />

            {showMessage && invalidMessage}
            
            <p className="user-name-requirements">
                Valid usernames MUST be 4 to 15 characters (which may be uppercase or lowercase), numbers, or underscores.
            </p>

            <input 
                name='bio'
                type='text'
                id='bio'
                value={formData.bio}
                onChange={handleChange}
                maxLength={maxBioLength}
                placeholder='bio'
                required
                autoComplete='off'
            />
            <input type='button' disabled={!formData.username.length} onClick={checkUsername} value="username available?"/>
            <input type='submit' disabled={!uniqueUsername || formData.username !== approvedUsername} />
        </form>
    )


}

export default UserForm;