import React, { useState, useEffect } from 'react';
import { fetchLogin } from './services';

const Login = ({ onLogin, setError }) => {
    const [username, setUsername] = useState('');

    const performLogin = () =>{
        const name = username;
        fetchLogin(name)
        .then( userInfo => {
            onLogin(userInfo);
        })
        .catch( (err) =>{
            setError(err.error);
        });
    };

    useEffect( () => {
        setError('');
    }, []);

    return (
        <div className="login">
            <img src="/header.png" alt="logo" className="header"></img>
            <h2 className="title">Log in to Zwitter</h2> 
            <input className="user-name" onChange={ (e) => setUsername(e.target.value)} placeholder="Enter name"/>
            <br/>
            <button className="add-user" onClick={ performLogin }>Log in</button>
        </div>
    );
};

export default Login;