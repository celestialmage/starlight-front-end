import { useState } from 'react';
import { createPost, fetchWithAuth } from '../utils/api';
import './PostForm.css';

const PostForm = ({setRerender}) => {

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

        fetchWithAuth(createPost, formData).then(console.log)
        setFormData(defaultForm)
        setRerender(render => !render);
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name='text'
                    type='text'
                    value={formData.text}
                    onChange={handleChange}
                    maxLength={maxPostLength}
                    required
                 />
                 <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default PostForm;