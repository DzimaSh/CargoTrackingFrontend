import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleInputLengthChange, configureRequestWithoutParams } from '@/service';
import axios from 'axios';
import './UserProfileUpdate.css';

export function UserProfileUpdate() {

    const location = useLocation();
    const userData = location.state;
    const navigate = useNavigate();

    const [userNameError, setUserNameError] = useState([false, '']);
    const [userSurnameError, setUserSurnameError] = useState([false, '']);
    const [userPatronymicError, setUserPatronymicError] = useState([false, '']);
    const [bornDate, setBornDate] = useState(userData.bornDate);
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
        setBornDate(userData.bornDate);
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
        handleInputLengthChange(e, 'User house', 0, 5, setUserHouseError);
    }

    const handleUserFlatInputChange = (e) => {
        userData.flat = e.target.value;
        handleInputLengthChange(e, 'User flat', 0, 5, setUserFlatError);
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
                alert('Profile was updated!');
                navigate('/profile');
            }
        })
    }

    return (
        <div className="update-profile">
            <div className="user-links">
                <ul>
                    <li><Link to={'/profile'}>Abort and go back</Link></li>
                </ul>
            </div>
            <form onChange={() => setErrors([])}>
                <div className="default-form">
                    <div className="input-info">
                        <label htmlFor='user_name'>
                            Name:
                        </label>
                        <input type='text' id='user_name' value={userData.name} onChange={handleUserNameInputChange}/>
                        {
                            userNameError[0] && 
                                <div className="errors">{userNameError[1]}</div>
                        }
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_surname'>
                            Surname: 
                        </label>
                        <input type='text' id='user_surname' value={userData.surname} onChange={handleUserSurnameInputChange}/>
                        {
                            userSurnameError[0] && 
                                <div className="errors">{userSurnameError[1]}</div>
                        }
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_patronymic'>
                            Patronymic: 
                        </label>
                        <input type='text' id='user_patronymic' value={userData.patronymic} onChange={handleUserPatronymicInputChange}/>
                        {
                            userPatronymicError[0] && 
                                <div className="errors">{userPatronymicError[1]}</div>
                        }
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_born_date'>
                            Born date:
                        </label>
                        <input type='date' id='user_born_date' value={bornDate} onChange={handleUserBornDateInputChange}/>
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_town'>
                            Town:
                        </label>
                        <input type='text' id='user_town' value={userData.town} onChange={handleUserTownInputChange}/>
                        {
                            userTownError[0] && 
                                <div className="errors">{userTownError[1]}</div>
                        }
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_street'>
                            Street: 
                        </label>
                        <input type='text' id='user_street' value={userData.street} onChange={handleUserStreetInputChange}/>
                        {
                            userStreetError[0] && 
                                <div className="errors">{userStreetError[1]}</div>
                        }
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_house'>
                            House:
                        </label>
                        <input type='text' id='user_house' value={userData.house} onChange={handleUserHouseInputChange}/>
                        {
                            userHouseError[0] && 
                                <div className="errors">{userHouseError[1]}</div>
                        }
                    </div>
                    <div className="input-info">
                        <label htmlFor='user_flat'>
                            Flat:
                        </label>
                        <input type='text' id='user_flat' value={userData.flat} onChange={handleUserFlatInputChange}/>
                        {
                            userFlatError[0] && 
                                <div className="errors">{userFlatError[1]}</div>
                        }
                    </div>
                    <div>
                        <button type='submit' onClick={handleSubmit}>Update</button>
                    </div>
                </div>
                <p className="errors">
                    <ul>
                        {errors.map((error) => <li key={error}>{error}</li>)}
                    </ul>
                </p>
            </form>
        </div>
    );
}