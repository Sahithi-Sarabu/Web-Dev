import React from 'react';
import { fetchLogout } from './services';

const Logout = ({ onLogout, setError }) =>{

    const performLogout = () =>{
        fetchLogout()
        .then( () => onLogout() )
        .catch( (err) =>{  
            setError(err.error);
        });
    };

    return (
        <div className="logout">
            <button className="logout-button" onClick={ performLogout }>Logout</button>
        </div>
    )
}

export default Logout;