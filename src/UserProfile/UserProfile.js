import React, { useEffect, useState } from "react";
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
            <div className="profile_info_wrap">
                <h4>About me:</h4>
                <div className="profile_info_short">
                    {userData.name && <div><b>Name: </b>{userData.name}</div>}
                    <div><b>Surname: </b>{userData.surname}</div>
                    {userData.patronymic && <div><b>Patronymic: </b>{userData.patronymic}</div>}
                    <div><b>Login: </b>{userData.login}</div>
                    <div><b>Email: </b>{userData.email}</div>
                </div>
                {!showMore &&
                    <div className="profile_info_full">
                        <div><b>Id: </b>{userData.id}</div>
                        {userData.bornDate && <div><b>Born date: </b>{userData.bornDate}</div>}
                        {userData.town && <div><b>Town: </b>{userData.town}</div>}
                        {userData.street && <div><b>Street: </b>{userData.street}</div>}
                        {userData.house && <div><b>House: </b>{userData.house}</div>}
                        {userData.flat && <div><b>Flat: </b>{userData.flat}</div>}
                        {userData.passportNum && <div><b>Passport number: </b>{userData.passportNum}</div>}
                        {userData.issuedBy && <div><b>Passport issuer: </b>{userData.issuedBy}</div>}
                        <div><b>Roles: </b><ul>{userData.userRoles.map((role) => <li key={role}>{role}</li>)}</ul></div>
                    </div>
                }
                <button className="show_button" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show more' : 'Show less'}
                </button>
            </div>
            <div className="links">
                <div className="update_link">
                    <Link to={'update'}>Update profile</Link>
                </div>
                <div className="change-password_link">
                    <Link to={'change-password'}>Change password</Link>
                </div>
            </div>
        </div>
    );
}
