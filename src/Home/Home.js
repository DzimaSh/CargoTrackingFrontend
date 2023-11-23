import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';

export function Home() {

    const [message, setMessage] = useState('Sign-in to use this application.');
    const [isSysAdmin, setIsSysAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect (() => {
        let roles = localStorage.getItem('roles');
        let login = localStorage.getItem('login');
        console.log(login);
        if (roles !== null) {
            setIsAuthenticated(true);
            if (roles.includes('SYS_ADMIN')) {
                setIsSysAdmin(true);
                setMessage("Hello, system administator! You can see clients of our company and manage 'em.");
            } else {
                setMessage(`Hello, user(${login})! You can see your profile:-) P.S. Sys admin was responsible for your roots!`);
            }
        } else {
           setIsAuthenticated(false);
        }
    }, []);

    return (
        <div className="home">
            <div className="user-links">
                <ul>
                {isSysAdmin && 
                    <li><Link className="link" to={'/clients'}>See clients</Link></li>
                }
                {isAuthenticated &&
                    <li><Link className="link" to={'/profile'}>My profile</Link></li>
                }
                </ul>
            </div>
            <div className="message">
                {message}
            </div>
        </div>
    )
}
