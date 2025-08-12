import { useParams } from "react-router-dom";
import UserForm from "./UserForm";
import './SignupUser.css'

const SignupUser = () => {

    const params = useParams();



    return (
        <div className="container">
            <div className="signup">
                <h2>enter your account information</h2>
                < UserForm token={params['userToken']} />
            </div>
        </div>
    )

}

export default SignupUser;