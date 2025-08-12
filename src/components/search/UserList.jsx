import User from "./User";
import './UserList.css';

const UserList = ({ users }) => {
    const userList = users.map(user => {
        return < User key={user.id} user={user} />
    })

    console.log(users)

    return (
        <div className='search-results'>
            {userList}
        </div>
    );
}

export default UserList;