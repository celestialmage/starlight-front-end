import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { checkUsernameAvailability } from "../utils/api";
import './UserForm.css';

const UserForm = ({ token='', userData, submitFunction }) => {
    const nav = useNavigate();
    const originalUsername = userData.username;

    const [ formData, setFormData ] = useState(userData);
    const [ uniqueUsername, setUniqueUsername ] = useState(false);
    const [ approvedUsername, setApprovedUsername ] = useState(originalUsername);
    const [ showMessage, setShowMessage ] = useState(false);

    const maxDisplayNameLength = 20;
    const maxUsernameLength = 15;
    const maxBioLength = 100;

    const invalidMessage = <p className='taken-username-message'>Username already taken! Please choose another.</p>

    const usernameRequirements = /^[A-Za-z0-9_]{4,15}$/;

    const checkUsername = () => {
        const username = formData.username;

        checkUsernameAvailability(username)
            .then((response) => {
                setUniqueUsername(response);
                if (response === true) {
                    setApprovedUsername(username);
                    setShowMessage(false)
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

        if (usernameRequirements.test(formData.username) &&
            (formData.username === approvedUsername || 
             formData.username.toLowerCase() === originalUsername.toLowerCase())) {
            const finalUserData = {};

            finalUserData['display_name'] = formData.displayName;
            finalUserData['username'] = formData.username;
            finalUserData['bio'] = formData.bio;
            finalUserData['id'] = formData.id;
            
            if (token) {
                const googleData = jwtDecode(token);
                finalUserData['id'] = googleData.sub;
                finalUserData['email'] = googleData.email;
            }

            submitFunction(finalUserData)
                .then(() => nav(`/${finalUserData.username}`));
        } else {
            console.log('failed');
            console.log(formData.username.toLowerCase())
            console.log(originalUsername.toLowerCase())
        }        
    }

    useEffect(() => {
        const user = jwtDecode(localStorage.getItem('StarlightAccessToken'));

        if (formData.id && user.sub !== formData.id) {
            nav(-1)
        }
    })


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

            {formData['username'].toLowerCase() !== originalUsername.toLowerCase() && 
                <input 
                    name='username-check'
                    type='button' 
                    id='username-check'
                    disabled={!formData.username.length} 
                    onClick={checkUsername} 
                    value="username available?"/>}

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
            <input type='submit' disabled={(!uniqueUsername || 
                                           formData.username !== approvedUsername) && 
                                           formData.username.toLowerCase() !== originalUsername.toLowerCase()} />
        </form>
    )


}

export default UserForm;