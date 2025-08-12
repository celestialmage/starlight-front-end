import User from "./User";
import './UserList.css';

const UserList = ({ users }) => {
    
    let userList;

    if (Array.isArray(users)) {
        userList = users.map(user => {
            return < User key={user.id} user={user} />
        });
    } else {
        console.error("Expected users to be an array, got:", users);
    }

    return (
        <div className='search-results'>
            {users && userList}
        </div>
    );
}

export default UserList;