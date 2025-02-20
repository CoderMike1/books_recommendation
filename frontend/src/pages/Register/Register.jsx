import {FaLock, FaUser} from "react-icons/fa";
import './Register.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () =>{
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();


    //registering account, checking if passwords are the same
    const handleRegister = async(e) => {
        e.preventDefault()
        try{
            if(password !== confirmPassword) {
                setErrorMessage("Passwords are different.")
                return
            }
            const response = await fetch("http://127.0.0.1:8000/api/register/",{
                method:"POST",
                headers:{
                  "content-type":"application/json"
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            })
            if(!response.ok){
                setErrorMessage("Error while registering account!")
            }
            else{
                setSuccessMessage("Successfully registered account!")
                setTimeout(() => {
                    setSuccessMessage("")
                    navigate("/login")
                },3000)

            }

        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="text-center">🔒 Register account</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={handleRegister}>
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
                    <div className="input-group">
                        <span className="input-group-text"><FaLock/></span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
                <button className="btn btn-primary w-100 login-button" onClick={() => navigate("/login")}>
                    Back to login
                </button>
            </div>
        </div>
    )

}

export default Register;