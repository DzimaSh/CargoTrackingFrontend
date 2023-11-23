import React from "react";
import axios from "axios";
import { configureRequestWithoutParams } from "../service/auth.service";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import {handleInputLengthChange, validateEmail} from '@/service'
import './New.css'

function NewClientForm() {

    const navigate = useNavigate();
    
    const [clientStatus, setClientStatus] = useState(null);
    const [clientNameError, setClientNameError] = useState([true, '']);
    const [clientStatusError, setClientStatusError] = useState([true, '']);
    const [adminSurnameError, setAdminSurnameError] = useState([true, '']);
    const [adminEmailError, setAdminEmailError] = useState([true, '']);
    const [adminLoginError, setAdminLoginError] = useState([true, '']);
    const [adminPasswordError, setAdminPasswordError] = useState([true, '']);
    const [errors, setErrors] = useState([]);
    
    const isFormValid = () => {
        let isValid = true;
        if (clientNameError[0]) {
            if (clientNameError[1] == ''){
                setClientNameError([true, 'Client name is required']);
            }
            isValid = false;
        }
        if (clientStatusError[0]) {
            if (clientStatusError[1] == ''){
                setClientStatusError([true, 'Client status is required']);
            }
            isValid = false;
        }
        if (adminSurnameError[0]) {
            if (adminSurnameError[1] == ''){
                setAdminSurnameError([true, 'Admin surname is required']);
            }
            isValid = false;
        }
        if (adminEmailError[0]) {
            if (adminEmailError[1] == ''){
                setAdminEmailError([true, 'Admin email is required']);
            }
            isValid = false;
        }
        if (adminLoginError[0]) {
            if (adminLoginError[1] == ''){
                setAdminLoginError([true, 'Admin login is required']);
            }
            isValid = false;
        }
        if (adminPasswordError[0]) {
            if (adminPasswordError[1] == ''){
                setAdminPasswordError([true, 'Admin password is required']);
            }
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }
        let data = {
            name: e.target.form.name.value,
            status: clientStatus,
            adminInfo: {
                surname: e.target.form.admin_surname.value,
                email: e.target.form.admin_email.value,
                login: e.target.form.admin_login.value,
                password: e.target.form.admin_password.value
            }
        }
        let config = configureRequestWithoutParams();
        axios.post('http://localhost:8080/api/clients', data, config)
            .catch(err => {
                if (err.response.status >= 400) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors(err.message);
                }

            })
            .then(response => {
                if (response.status < 400) {
                    navigate('/clients');
                }
            })
    }

    return (
        <div className="new-client">
            <div className="user-links">
                <ul>
                    <li><Link to={'/clients'}>Abort and go back</Link></li>
                </ul>
            </div>
            <form onChange={() => setErrors([])}>
                <div className="default-form">
                    <p>Client info:</p>
                    <div className="client-info">         
                        <div className="input-info">
                            <label htmlFor='name'>Client name:</label>
                            <input type='text' id='name' name='name' onChange={(e) => handleInputLengthChange(e, 'Client name', 1, 30, setClientNameError)}/>
                            {
                                clientNameError[0] && 
                                    <div className="errors">{clientNameError[1]}</div>
                            }
                        </div>
                        <div className="input-info">
                            <label htmlFor='status'>Client status:</label>
                            <input type='radio' id='private_status' name='status' onChange={() => {setClientStatus('PRIVATE'); setClientStatusError([false, ''])}}/>
                            <label htmlFor='private_status'>PRIVATE</label>
                            <input type='radio' id='legal_status' name='status' onChange={() => {setClientStatus('LEGAL'); setClientStatusError([false, ''])}}/>
                            <label htmlFor='legal_status'>LEGAL</label>
                            {
                                clientStatusError[0] && 
                                    <div className="errors">{clientStatusError[1]}</div>
                            }
                        </div>                   
                    </div>
                    <p>Admin Info:</p>
                    <div className="admin-info">
                        <div className="input-info">
                            <label htmlFor='admin_surname'>Admin surname:</label>
                            <input type='text' id='admin_surname' name='admin_surname' onChange={(e) => handleInputLengthChange(e, 'Admin surname', 1, 20, setAdminSurnameError)}/>
                            {
                                adminSurnameError[0] && 
                                    <div className="errors">{adminSurnameError[1]}</div>
                            }
                        </div>
                        <div className="input-info">
                            <label htmlFor='admin_email'>Admin email:</label>
                            <input type='email' id='admin_email' name='admin_email' onChange={(e) => {handleInputLengthChange(e, 'Admin email', 1, 50, setAdminEmailError); validateEmail(e.target.value, setAdminEmailError)}}/>
                            {
                                adminEmailError[0] && 
                                    <div className="errors">{adminEmailError[1]}</div>
                            }
                        </div>
                        <div className="input-info">
                            <label htmlFor='admin_login'>Admin login:</label>
                            <input type='text' id='admin_login' name='admin_login' onChange={(e) => handleInputLengthChange(e, 'Admin login', 5, 15, setAdminLoginError)}/>
                            {
                                adminLoginError[0] && 
                                    <div className="errors">{adminLoginError[1]}</div>
                            }
                        </div>
                        <div className="input-info">
                            <label htmlFor='admin_password'>Admin password:</label>
                            <input type='password' id='admin_password' name='admin_password' onChange={(e) => handleInputLengthChange(e, 'Admin password', 5, 72, setAdminPasswordError)}/>
                            {
                                adminPasswordError[0] && 
                                    <div className="errors">{adminPasswordError[1]}</div>
                            }
                        </div>
                    </div>
                    <div>
                        <button type='submit' onClick={handleSubmit}>Create</button>
                    </div>
                    <p className="errors">
                        <ul>
                            {errors.map((error) => <li key={error}>{error}</li>)}
                        </ul>
                    </p>
                </div>
            </form>
        </div>
    );
}

export { NewClientForm };
