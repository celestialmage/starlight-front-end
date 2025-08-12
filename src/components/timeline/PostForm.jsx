import { useState } from 'react';
import { createPost, fetchWithAuth } from '../utils/api';
import './PostForm.css';

const PostForm = ({ addNewPost }) => {

    const defaultForm = {
        text: ''
    };
    
    const [formData, setFormData] = useState(defaultForm);
    const maxPostLength = 200

    const handleChange = ({ target }) => {
        
        setFormData({
            ...formData,
            [target.name]: target.value
        });

        console.log(formData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchWithAuth(createPost, formData).then(addNewPost);
        setFormData(defaultForm);
    }

    return (
        <div className='post-form'>
            <form onSubmit={handleSubmit}>
                <input 
                    name='text'
                    type='text'
                    value={formData.text}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                    maxLength={maxPostLength}
                    placeholder="what's happening?"
                    required
                    autoComplete='off'
                 />
                 <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default PostForm;