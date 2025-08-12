import PostForm from "../timeline/PostForm";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import HomeButton from "./HomeButton";

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