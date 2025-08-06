import PostForm from "./PostForm"
import LogoutButton from "./LogoutButton"

const Home = ({ setRerender }) => {
    return (
        <div className="menu">
            < PostForm setRerender={setRerender}/>
            < LogoutButton />
        </div>
    )
}

export default Home;