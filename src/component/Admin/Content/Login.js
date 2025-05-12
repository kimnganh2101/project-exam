import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../service/User";
import "./Login.scss";
import { useState } from 'react';
import { UserLoginAction } from "../../../redux/action/UserAction";
import { toast } from "react-toastify";
import rootReducer from "../../../redux/reducer/rootReducer";
import { useNavigate } from "react-router-dom";



const Login = (props) =>{
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const postLogin = async() =>{
        const data = await loginUser(email, password)
        if (data && data.EC === 0) {
            navigate('/');
            dispatch(
                UserLoginAction(data)
            )
    }

}
    return(
        <div className="container-login  d-flex ">
            <div className="conatin-header text-end">
                Don't have an account yet?
            </div>
            <div className="conatin-title text-center ">
                KIMNGAN
            </div>
            <div className="conatin-welcom text-center  ">
                Hello, Who's this?
            </div>
            <div className="content-form display ">
                <div className="form-group">
                    <label>username</label>
                    <input type={"email"} className="form-control" onChange={(event) => setemail(event.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type={"password"} className="form-control" onChange={(event) => setpassword(event.target.value)}></input>
                </div>
                <div>
                    <span>
                        forgot password?
                    </span>
                </div>
                <div>
                    <button onClick={postLogin}>
                        Login
                    </button>
                </div>

            </div>


        </div>
    )

}
export default Login;