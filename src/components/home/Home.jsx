import PostForm from "../timeline/PostForm";
import HomeButton from "./HomeButton";
import SearchButton from "./SearchButton";
import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";
import './Home.css';

const Home = ({ addNewPost }) => {
    return (
        <div className="menu">
            < HomeButton />
            < SearchButton />
            < ProfileButton />
            < LogoutButton />
            {window.location.pathname === '/' && < PostForm addNewPost={addNewPost} />}
        </div>
    )
}

export default Home;