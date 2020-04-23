import React, {useState, useEffect} from 'react';
import './App.css';
import {fetchLoginStatus} from './services';
import HomePage from './HomePage';
import Login from './Login';
import ProfilePage from './ProfilePage';
import ExplorePage from './ExplorePage';
import TweetDetailsPage from './TweetDetailsPage';
import OtherUserProfilePage from './OtherUserProfilePage';

function App() {
  const [userState, setUserState] = useState({isLoggedIn : false});
  const [error, setError] = useState('');
  const [isHomePage, setHomePage] = useState(false);
  const [isProfilePage, setProfilePage] = useState(false);
  const [isExplorePage, setExplorePage] = useState(false);
  const [otherUserPage, setOtherUserPage] = useState({isOtherPage:false});
  const [tweetDetailsPage, setTweetDetailsPage] = useState({isTweetDetailsPage:false});

  useEffect( () => {
    fetchLoginStatus()
    .then( (userInfo) =>{
      setUserState({ 
        isLoggedIn: true,
        username: userInfo.name,
        id:userInfo.id
      })
      setHomePage(true);
    })
  }, []);

  const login = (userInfo) =>{
    setUserState({ 
      isLoggedIn: true,
      username: userInfo.name,
      id:userInfo.id
    });
    setHomePage(true);
  };

  if(isProfilePage){
    return (
      <div className="App">
        <ProfilePage isProfilePage={isProfilePage} setTweetDetailsPage={setTweetDetailsPage} otherUserPage={otherUserPage} 
           isExplorePage={isExplorePage} userState={userState} setUserState={ setUserState } setError={ setError } 
           setHomePage={setHomePage} setProfilePage={setProfilePage} setExplorePage={setExplorePage} 
           setOtherUserPage={setOtherUserPage}></ProfilePage>
        <p className ="status">{ error }</p>
      </div>
    );
  }else if(isExplorePage){
    return (
      <div className="App">
        <ExplorePage isProfilePage={isProfilePage} setTweetDetailsPage={setTweetDetailsPage} otherUserPage={otherUserPage} 
            isExplorePage={isExplorePage} userState={userState} setUserState={ setUserState } setError={ setError } 
            setHomePage={setHomePage} setProfilePage={setProfilePage} setExplorePage={setExplorePage} 
            setOtherUserPage={setOtherUserPage}></ExplorePage>
        <p className ="status">{ error }</p>
      </div>
    );
  }else if(isHomePage){
    return (
      <div className="App">
        <HomePage isProfilePage={isProfilePage} setTweetDetailsPage={setTweetDetailsPage} otherUserPage={otherUserPage} 
        isExplorePage={isExplorePage} userState={userState} setUserState={ setUserState } setError={ setError } 
        setHomePage={setHomePage} setProfilePage={setProfilePage} setExplorePage={setExplorePage} 
        setOtherUserPage={setOtherUserPage}/>
        <p className ="status">{ error }</p>
      </div>
    );
  }else if(otherUserPage.isOtherPage){
    return (
      <div className="App">
        <OtherUserProfilePage isProfilePage={isProfilePage} setTweetDetailsPage={setTweetDetailsPage} 
           isExplorePage={isExplorePage} otherUserPage={otherUserPage} userState={userState} setUserState={setUserState} 
           setError={setError} setHomePage={setHomePage} setProfilePage={setProfilePage} setExplorePage={setExplorePage} 
           setOtherUserPage={setOtherUserPage}/>
        <p className ="status">{ error }</p>
      </div>
    );
  }else if(tweetDetailsPage.isTweetDetailsPage){
    return (
      <div className="App">
        <TweetDetailsPage tweetDetailsPage={tweetDetailsPage} setTweetDetailsPage={setTweetDetailsPage} 
           userState={userState} setUserState={ setUserState } setError={ setError } setHomePage={setHomePage} 
           setProfilePage={setProfilePage} setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage}/>
        <p className="status">{error}</p>
      </div>
    );
  }else{
    return (
      <div className="App">
        <Login onLogin={ login } setError={ setError }/>
        <p className ="status">{ error }</p>
      </div>
    );
  }
}

export default App;
