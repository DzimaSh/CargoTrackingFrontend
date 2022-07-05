import React, {useState} from "react";
import axios from "axios";
import {handleJwtResponse} from "@/service";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const data = { login, password };
        axios.post("http://localhost:8080/api/sign-in", data)
            .catch(err => {
                if (err.response.status >= 400) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors(err.message);
                }

            })
            .then(response => {
                handleJwtResponse(response);
                navigate('/');
            });        
    }

    const handleLoginChange = e => setLogin(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);

    return (
        <form className="login-form">
            <div>
                <label className="login-label" htmlFor="login">Login</label>
                <input className="login-input" name="login" type="text" onChange={handleLoginChange}/>
            </div>
            <div>
                <label className="login-label" htmlFor="password">Password</label>
                <input className="login-input" name="password" type="password" onChange={handlePasswordChange}/>
            </div>
            <div>
                <button className="login-button" type="submit" onClick={handleSubmit}>Login</button>
            </div>
            <p className="errors">
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
            </p>
        </form>
    )
}

export {Login};
