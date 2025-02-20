import { useState,useContext} from "react";
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {SessionStorageContext} from "../SessionStorageContext.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {setIsLogged,setAccessToken} = useContext(SessionStorageContext);

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);

        const resp = await fetch("http://localhost:8000/api/login/",{
            method: "POST",
            body : formData
        });
        if(!resp.ok){
            setMessage("Error while logging in...")
            setUsername("");
            setPassword("");
        }
        else {
            const data = await resp.json();
            setIsLogged(true);
            setAccessToken(data['token']);
        }
        }
        catch(error){
            console.error(error)
        }

    }
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="text-center">🔒 Login in</h2>
                {message && <div className="alert alert-danger">{message}</div>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <span className="input-group-text"><FaUser/></span>
                        <input
                            type="username"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text"><FaLock/></span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit
                        </button>
                </form>
                <button className="btn btn-primary w-100 new-account-button" onClick={() => navigate("/register")}>
                    Create a new account
                </button>
            </div>
        </div>
    )


}

export default Login;