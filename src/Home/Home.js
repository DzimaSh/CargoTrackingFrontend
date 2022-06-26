import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {

    const [message, setMessage] = useState('Sign-in to use this application.');
    const [isSysAdmin, setIsSysAdmin] = useState(false);

    useEffect (() => {
        let roles = localStorage.getItem('roles');
        if (roles !== null) {
            setMessage('Hello,' + roles);
            if (roles.includes('SYS_ADMIN')) {
                setIsSysAdmin(true);
            }
        }
    }, []);

    return (
        <div>
            {message}
            <br/>
            {isSysAdmin && 
                <Link to={'/clients'}>See clients</Link>
            }
        </div>
    )
}
