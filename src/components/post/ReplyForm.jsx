import { useState } from 'react';
import { createReply, fetchWithAuth } from '../utils/api';
import './ReplyForm.css';

const ReplyForm = ({ postId, addNewReply }) => {

    const defaultForm = {
        text: '',
        post_id: postId
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

        fetchWithAuth(createReply, formData).then(addNewReply);
        setFormData(defaultForm);
    }

    return (
        <div className='reply-section'>
            <form className='reply-form' onSubmit={handleSubmit}>
                <input 
                    name='text'
                    type='text'
                    value={formData.text}
                    onChange={handleChange}
                    maxLength={maxPostLength}
                    placeholder="something to say?"
                    required
                    autoComplete='off'
                 />
                 <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default ReplyForm;