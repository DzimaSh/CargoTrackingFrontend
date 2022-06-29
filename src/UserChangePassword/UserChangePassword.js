import React, { useState } from "react";
import { handleInputLengthChange, configureRequestWithoutParams } from '@/service';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function UserChangePassword() {

    const [oldPasswordError, setOldPasswordError] = useState([true, '']);
    const [newPasswordError, setNewPasswordError] = useState([true, '']);
    const [confirmPasswordError, setConfirmPasswordError] = useState([false, '']);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const checkIfConfirmedPasswordMatchs = e => {
        if (e.target.form.new_password.value !== e.target.form.confirm_new_password.value) {
            setConfirmPasswordError([true, "Doesn't match!"])
        } else {
            setConfirmPasswordError([false, ''])
        }
    }

    const handleNewPasswordChange = e => {
        handleInputLengthChange(e, 'New password', 5, 72, setNewPasswordError);
        checkIfConfirmedPasswordMatchs(e);
    }

    const handleOldPasswordChange = e => {
        handleInputLengthChange(e, 'Old password', 5, 72, setOldPasswordError);
    }

    const isFormValid = e => {
        let isValid = true;
        if (oldPasswordError[0]) {
            if (oldPasswordError[1] == ''){
                setOldPasswordError([true, 'Old password is required']);
            }
            isValid = false;
        }
        if (newPasswordError[0]) {
            if (newPasswordError[1] == ''){
                setNewPasswordError([true, 'New password is required']);
            }
            isValid = false;
        }
        if (confirmPasswordError[0]) {
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
            oldPassword: e.target.form.old_password.value,
            newPassword: e.target.form.new_password.value,
        }
        let config = configureRequestWithoutParams();
        axios.put('http://localhost:8080/api/profile/change-password', data, config)
            .catch(err => {
                setErrors(err.response.data.errors);
            })
            .then(response => {
                if (response.status < 400) {
                    alert('Password was updated!');
                    navigate('/profile');
                }
            })
    }

    return (
        <div>
            <form onChange={() => setErrors([])}>
                <div className="password_input">
                    <label htmlFor='old_password'>
                        Old password
                    </label>
                    <input type='password' id='old_password' onChange={handleOldPasswordChange}/>
                    {
                        oldPasswordError[0] && 
                            <div style={{color:'red'}}>{oldPasswordError[1]}</div>
                    }
                </div>
                <div className="password_input">
                    <label htmlFor='new_password'>
                        New password
                    </label>
                    <input type='password' id='new_password' onChange={handleNewPasswordChange}/>
                    {
                        newPasswordError[0] && 
                            <div style={{color:'red'}}>{newPasswordError[1]}</div>
                    }
                </div>
                <div className="password_input">
                    <label htmlFor='confirm_new_password'>
                        Confirm password
                    </label>
                    <input type='password' id='confirm_new_password' onChange={checkIfConfirmedPasswordMatchs}/>
                    {
                        confirmPasswordError[0] && 
                            <div style={{color:'red'}}>{confirmPasswordError[1]}</div>
                    }
                </div>
                <div className="submit_button">
                    <button type='submit' onClick={handleSubmit}>Change</button>
                </div>
            </form>
            <p style={{color:'red'}}>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
            </p>
        </div>
    );
}
