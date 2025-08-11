import PostForm from "./PostForm"
import LogoutButton from "./LogoutButton"

const Home = ({ addNewPost }) => {
    return (
        <div className="menu">
            < LogoutButton />
            < PostForm addNewPost={addNewPost} />
        </div>
    )
}

export default Home;