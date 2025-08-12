import { useNavigate } from "react-router-dom";

const HomeButton = () => {
    const nav = useNavigate();

    const goToHome = () => {
        nav('/');
    };

    return (
        <button onClick={goToHome}>Home</button>
    )
}

export default HomeButton;