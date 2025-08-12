import { useState } from "react";
import { fetchWithAuth, fetchUserBySearch } from "../utils/api";

const SearchForm = ({ setResults }) => {
    
    const defaultFormData = {
        'query': ''
    };
    
    const [ formData, setFormData ] = useState(defaultFormData);
    const maxSearchLength = 50;

    const handleChange = ({ target }) => {
        setFormData({
            ...FormData,
            [target.name]: target.value
        });

        console.log(formData)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            query: formData.query
        };

        fetchWithAuth(fetchUserBySearch, options)
            .then(console.log)
            // .then(setResults);
        setFormData(defaultFormData);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                name='query'
                type='text'
                value={formData.text}
                onChange={handleChange}
                maxLength={maxSearchLength}
                placeholder="search"
                required
                autoComplete="off"
            />
            <input type='submit' value="search"/>
        </form>
    )
}

export default SearchForm;