import React, {useState} from "react";
import axios from "axios";
import {handleJwtResponse} from "@/service";
import { useNavigate } from "react-router-dom";


function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let error = {
        status: null,
        message: null
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = { login, password };
        axios.post("http://localhost:8080/api/sign-in", data)
            .catch(err => {
                error = {
                    status: err.response.status,
                    message: err.response.data.message
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
        <form>
            <div className={'form-group'}>
                <label htmlFor="login">Login</label>
                <input className={'form-control'} name="login" type="text" onChange={handleLoginChange}/>
            </div>
            <div className={'form-group'}>
                <label htmlFor="password">Password</label>
                <input className={'form-control'} name="password" type="password" onChange={handlePasswordChange}/>
            </div>
            <div>
                <button className={'ui-button'} type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </form>
    )
}

export {Login};
