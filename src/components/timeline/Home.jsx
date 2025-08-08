import PostForm from "./PostForm"
import LogoutButton from "./LogoutButton"

const Home = ({ setRerender }) => {
    return (
        <div className="menu">
            < LogoutButton />
            < PostForm setRerender={setRerender}/>
        </div>
    )
}

export default Home;