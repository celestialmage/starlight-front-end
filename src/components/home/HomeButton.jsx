import { useNavigate } from "react-router-dom";

const HomeButton = () => {
    const nav = useNavigate();

    const goToHome = () => {
        nav('/');
    };

    return (
        <button className='button' onClick={goToHome}>Home</button>
    )
}

export default HomeButton;