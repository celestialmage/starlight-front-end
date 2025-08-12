import { useNavigate } from "react-router-dom";

const SearchButton = () => {

    const nav = useNavigate();

    const goToSearch = () => {
        nav('/search');
    }

    return (
        <button className='button' onClick={goToSearch}>Search</button>
    );
};

export default SearchButton;