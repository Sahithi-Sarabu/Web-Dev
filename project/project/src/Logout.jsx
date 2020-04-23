import React from 'react';
import { fetchLogout } from './services';

const Logout = ({ onLogout, setError }) =>{

    const performLogout = () =>{
        fetchLogout()
        .then( () => onLogout() )
        .catch( (err) =>{ 
            console.log(err.error); 
            setError(err.error);
        });
    };

    return (
        <button className="button" onClick={ performLogout }>Logout</button>
    )
}

export default Logout;