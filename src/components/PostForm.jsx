import React, { useState } from 'react';
import { createPost, fetchWithAuth } from '../utils/api';

const PostForm = () => {

    const defaultForm = {
        text: ''
    };
    
    const [formData, setFormData] = useState(defaultForm);

    const handleChange = ({ target }) => {
        
        setFormData({
            ...formData,
            [target.name]: target.value
        });

        console.log(formData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchWithAuth(createPost, formData).then(console.log)
        setFormData(defaultForm)
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name='text'
                    type='text'
                    value={formData.text}
                    onChange={handleChange}
                    maxLength={240}
                    required
                 />
                 <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default PostForm;