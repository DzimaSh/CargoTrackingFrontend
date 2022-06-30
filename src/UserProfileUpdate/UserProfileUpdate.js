import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleInputLengthChange, configureRequestWithoutParams } from '@/service';
import axios from 'axios';

export function UserProfileUpdate() {

    const location = useLocation();
    const userData = location.state;
    const navigate = useNavigate();

    const [userNameError, setUserNameError] = useState([false, '']);
    const [userSurnameError, setUserSurnameError] = useState([false, '']);
    const [userPatronymicError, setUserPatronymicError] = useState([false, '']);
    const [userTownError, setUserTownError] = useState([false, '']);
    const [userStreetError, setUserStreetError] = useState([false, '']);
    const [userHouseError, setUserHouseError] = useState([false, '']);
    const [userFlatError, setUserFlatError] = useState([false, '']);
    const [errors, setErrors] = useState([]);

    const isFormValid = () => {
        let isValid = true;
        if (userNameError[0]) {
            isValid = false;
        }
        if (userSurnameError[0]) {
            if (userSurnameError[1] == ''){
                setUserSurnameError([true, 'User Surname is required']);
            }
            isValid = false;
        }
        if (userPatronymicError[0]) {
            isValid = false;
        }
        if (userTownError[0]) {
            isValid = false;
        }
        if (userStreetError[0]) {
            isValid = false;
        }
        if (userHouseError[0]) {
            isValid = false;
        }
        if (userFlatError[0]) {
            isValid = false;
        }
        return isValid;
    }

    const handleUserNameInputChange = (e) => {
        userData.name = e.target.value;
        handleInputLengthChange(e, 'User name', 0, 20, setUserNameError);
    }

    const handleUserSurnameInputChange = (e) => {
        userData.surname = e.target.value;
        handleInputLengthChange(e, 'User surname', 1, 20, setUserSurnameError);
    }

    const handleUserPatronymicInputChange = (e) => {
        userData.patronymic = e.target.value;
        handleInputLengthChange(e, 'User patronymic', 0, 20, setUserPatronymicError);
    }

    const handleUserBornDateInputChange = (e) => {
        userData.bornDate = e.target.value;
    }

    const handleUserTownInputChange = (e) => {
        userData.town = e.target.value;
        handleInputLengthChange(e, 'User town', 0, 20, setUserTownError);
    }

    const handleUserStreetInputChange = (e) => {
        userData.street = e.target.value;
        handleInputLengthChange(e, 'User street', 0, 20, setUserStreetError);
    }

    const handleUserHouseInputChange = (e) => {
        userData.house = e.target.value;
        handleInputLengthChange(e, 'User house', 0, 20, setUserHouseError);
    }

    const handleUserFlatInputChange = (e) => {
        userData.flat = e.target.value;
        handleInputLengthChange(e, 'User flat', 0, 20, setUserFlatError);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        let config = configureRequestWithoutParams();

        axios.put('http://localhost:8080/api/profile', userData, config)
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
            <form>
                <div>
                    <label htmlFor='user_name'>
                        <b>Name: </b> 
                    </label>
                    <input type='text' id='user_name' value={userData.name} onChange={handleUserNameInputChange}/>
                    {
                        userNameError[0] && 
                            <div style={{color:'red'}}>{userNameError[1]}</div>
                    }
                </div>
                <div>
                    <label htmlFor='user_surname'>
                        <b>Surname: </b> 
                    </label>
                    <input type='text' id='user_surname' value={userData.surname} onChange={handleUserSurnameInputChange}/>
                    {
                        userSurnameError[0] && 
                            <div style={{color:'red'}}>{userSurnameError[1]}</div>
                    }
                </div>
                <div>
                    <label htmlFor='user_patronymic'>
                        <b>Patronymic: </b> 
                    </label>
                    <input type='text' id='user_patronymic' value={userData.patronymic} onChange={handleUserPatronymicInputChange}/>
                    {
                        userPatronymicError[0] && 
                            <div style={{color:'red'}}>{userPatronymicError[1]}</div>
                    }
                </div>
                <div>
                    <label htmlFor='user_born_date'>
                        <b>Born date: </b> 
                    </label>
                    <input type='date' id='user_born_date' value={userData.bornDate} onChange={handleUserBornDateInputChange}/>
                </div>
                <div>
                    <label htmlFor='user_town'>
                        <b>Town: </b> 
                    </label>
                    <input type='text' id='user_town' value={userData.town} onChange={handleUserTownInputChange}/>
                    {
                        userTownError[0] && 
                            <div style={{color:'red'}}>{userTownError[1]}</div>
                    }
                </div>
                <div>
                    <label htmlFor='user_street'>
                        <b>Street: </b> 
                    </label>
                    <input type='text' id='user_street' value={userData.street} onChange={handleUserStreetInputChange}/>
                    {
                        userStreetError[0] && 
                            <div style={{color:'red'}}>{userStreetError[1]}</div>
                    }
                </div>
                <div>
                    <label htmlFor='user_house'>
                        <b>House: </b> 
                    </label>
                    <input type='text' id='user_house' value={userData.house} onChange={handleUserHouseInputChange}/>
                    {
                        userHouseError[0] && 
                            <div style={{color:'red'}}>{userHouseError[1]}</div>
                    }
                </div>
                <div>
                    <label htmlFor='user_flat'>
                        <b>Flat: </b> 
                    </label>
                    <input type='text' id='user_flat' value={userData.flat} onChange={handleUserFlatInputChange}/>
                    {
                        userFlatError[0] && 
                            <div style={{color:'red'}}>{userFlatError[1]}</div>
                    }
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit}>Update</button>
                </div>
            </form>
            <p style={{color:'red'}}>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
            </p>
            <Link to={'/profile'}>Abort and go back</Link>
        </div>
    );
}