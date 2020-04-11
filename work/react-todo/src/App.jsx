import React, {useState, useEffect } from 'react';
import './App.css';
import { fetchLoginStatus } from './services';
import Login from './Login';
import Todo from './Todo';
//import UserContext from './UserContext';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false});
  const [error, setError] = useState('');

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
    //<UserContext.Provider value = { [userState, setUserState] }>
      <div className="App">
        {userState.isLoggedIn ? <Todo userState={userState} setUserState= {setUserState} setError={setError} /> : <Login onLogin={ login } setError={ setError }/> }
        <p className ="status">{ error }</p>
      </div>
    //</UserContext.Provider>
  );
}

export default App;