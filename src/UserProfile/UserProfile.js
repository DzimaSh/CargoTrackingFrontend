import React, { useEffect, useState } from "react";
import './UserProfile.css';
import axios from "axios";
import { configureRequestWithoutParams } from "../service/auth.service";
import { Link } from "react-router-dom";

export function UserProfile() {

    const url = "http://localhost:8080/api/profile";

    const [showMore, setShowMore]= useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        let config = configureRequestWithoutParams();
        axios.get(url, config)
            .then(response => {
                setUserData(response.data);
            })
    }, []);

    return (
        <div className="profile">
            <div className="user-links">
                <ul>
                    <li><Link to={'update'} state={userData}>Update profile</Link></li>
                    <li><Link to={'change-password'}>Change password</Link></li>
                    <li><Link to={'/'}>Go back</Link></li>
                </ul>
            </div>
            <div className="profile-info-wrap">
                <p>About me:</p>
                <div className="profile-info">
                    {userData.name && 
                        <div className="info-wrapper">
                            <div className="label">Name:</div>
                            <div className="info">{userData.name}</div>
                        </div>
                    }
                    <div className="info-wrapper">
                        <div className="label">Surname:</div>
                        <div className="info">{userData.surname}</div>
                    </div>
                    {userData.patronymic && 
                        <div className="info-wrapper">
                            <div className="label">Patronymic:</div>
                            <div className="info">{userData.patronymic}</div>
                        </div>
                    }
                    <div className="info-wrapper">
                        <div className="label">Login:</div>
                        <div className="info">{userData.login}</div>
                    </div>
                    <div className="info-wrapper">
                        <div className="label">Email:</div>
                        <div className="info">{userData.email}</div>
                    </div>
                </div>
                {!showMore &&
                    <div className="profile-info">
                        <div className="info-wrapper">
                            <div className="label">Id:</div>
                            <div className="info">{userData.id}</div>
                        </div>
                        {userData.bornDate && 
                            <div className="info-wrapper">
                                <div className="label">Birthday:</div>
                                <div className="info">{userData.bornDate}</div>
                            </div>
                        }
                        {userData.town && 
                            <div className="info-wrapper">
                                <div className="label">Town:</div>
                                <div className="info">{userData.town}</div>
                            </div>
                        }
                        {userData.street && 
                            <div className="info-wrapper">
                                <div className="label">Street:</div>
                                <div className="info">{userData.street}</div>
                            </div>
                        }
                        {userData.house && 
                            <div className="info-wrapper">
                                <div className="label">House:</div>
                                <div className="info">{userData.house}</div>
                            </div>
                        }
                        {userData.flat && 
                            <div className="info-wrapper">
                                <div className="label">Flat:</div>
                                <div className="info">{userData.flat}</div>
                            </div>
                        }
                        {userData.passportNum && 
                            <div className="info-wrapper">
                                <div className="label">Passport number:</div>
                                <div className="info">{userData.passportNum}</div>
                            </div>
                        }
                        {userData.issuedBy && 
                            <div className="info-wrapper">
                                <div className="label">Passport issuer:</div>
                                <div className="info">{userData.issuedBy}</div>
                            </div>
                        }
                        <div className="info-wrapper">
                            <div className="label">Roles:</div>
                            <div className="info">
                                <ul>{userData.userRoles.map((role) => <li key={role}>{role}</li>)}</ul>
                            </div>
                        </div>
                    </div>
                }
                <button className="show-button" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show more' : 'Show less'}
                </button>
            </div>
        </div>
    );
}
