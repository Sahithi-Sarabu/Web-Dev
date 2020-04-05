import React, {useState, useEffect } from 'react';
import './App.css';
import { fetchLoginStatus } from './services';
import Login from './Login';
import Chat from './Chat';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false});
  const [error, setError] = useState('');

  useEffect( () => {
    fetchLoginStatus()
    .then( (userName) =>{
      setUserState({ 
        isLoggedIn: true,
        username: userName,
      })
    })
  }, []);

  const login = (username) =>{
    setUserState({ 
      isLoggedIn: true,
      username
    });
  };

  return (
    <div className="App">
      {userState.isLoggedIn ? <Chat setUserState={ setUserState } setError={ setError }/> : <Login onLogin={ login } setError={ setError }/> }
      <p className ="status">{ error }</p>
    </div>
  );
}

export default App;
