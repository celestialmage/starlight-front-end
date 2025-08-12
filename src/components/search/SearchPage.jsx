import { useState } from "react";
import Home from "../home/Home";
import SearchForm from "./SearchForm";
import UserList from "./UserList";
import './SearchPage.css';

const SearchPage = () => {

    const [ results, setResults ] = useState([]);

    return (
        <div className='container'>
            <div className='search-head'>
                < Home />
                < SearchForm setResults={setResults} />
            </div>
            < UserList users={results} />
        </div>
    )
}

export default SearchPage;