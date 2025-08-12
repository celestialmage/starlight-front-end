import PostForm from "../timeline/PostForm";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import HomeButton from "./HomeButton";
import './Home.css';

const Home = ({ addNewPost }) => {
    return (
        <div className="menu">
            < HomeButton />
            < ProfileButton />
            < LogoutButton />
            {window.location.pathname === '/' && < PostForm addNewPost={addNewPost} />}
        </div>
    )
}

export default Home;