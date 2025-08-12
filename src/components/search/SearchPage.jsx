import { useState } from "react";
import Home from "../home/Home";
import SearchForm from "./SearchForm";

const SearchPage = () => {

    const [ results, setResults ] = useState([]);

    return (
        <div className='container'>
            <div className='search-head'>
            < SearchForm setResults={setResults} />
            </div>
        </div>
    )
}

export default SearchPage;