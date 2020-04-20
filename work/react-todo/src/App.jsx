import React, {useState, useEffect } from 'react';
import './App.css';
import { fetchLoginStatus } from './services';
import Login from './Login';
import Todo from './Todo';
import ThemeContext from './ThemeContext';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false});
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect( () => {
    fetchLoginStatus()
    .then( (userInfo) => {
       setUserState({ 
        isLoggedIn: true,
        username: userInfo.data.username
      })
    })
  }, []);

  const login = (username) => {
     setUserState({ 
       isLoggedIn: true,
       username
     });
  };

  return (
    <ThemeContext.Provider value = { [theme, setTheme] }>
      <div className= {theme} >
        {userState.isLoggedIn ? <Todo userState={userState} setUserState= {setUserState} setError={setError} /> : <Login onLogin={ login } setError={ setError }/> }
        <p className ="status">{ error }</p>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;