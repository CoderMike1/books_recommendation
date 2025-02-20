import { useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import {SessionStorageContext} from "./pages/SessionStorageContext.jsx";
import Home from './pages/Home/Home.jsx'
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
function App() {

    const {isLogged,setIsLogged} = useContext(SessionStorageContext);

    //depends on isLogged, app will let user to /home or not
    return (
         <Router>
            <Routes>
                <Route path="/register" element={isLogged ? <Navigate to="/home"/> : <Register/>} />
                <Route path="/login" element={isLogged ? <Navigate to="/home" /> : <Login  />} />
                <Route path="/home" element={isLogged ? <Home /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isLogged ? "/home" : "/login"} />} />
            </Routes>
        </Router>
    );
}
export default App
