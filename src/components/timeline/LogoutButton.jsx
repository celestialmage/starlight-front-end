import { useNavigate } from "react-router-dom";

const LogoutButton = () => {

    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('StarlightAccessToken');
        localStorage.removeItem('StarlightRefreshToken');
        nav('/login');
    }

    return (
        <button onClick={handleLogout}>
            Log Out
        </button>
    )
}

export default LogoutButton;