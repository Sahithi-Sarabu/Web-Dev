import React, {useEffect, useState } from 'react';
import { fetchLogin } from './services';

const Login = ({ onLogin, setError }) => {
    const [username, setUsername] = useState('');

    const performLogin = () =>{
        const name = username;
        fetchLogin(name)
        .then( userInfo => {
            onLogin(userInfo.data.username);
        })
        .catch( (err) =>{
            setError(err.message);
        });
    };

    useEffect( () => {
        setError('');
    }, []);

    return (
        <div className="login">
            <input className="user-name" onChange={ (e) => setUsername(e.target.value)} placeholder="Enter name"/>
            <button className="add-user" onClick={ performLogin }>Login</button>
        </div>
    );
};

export default Login;