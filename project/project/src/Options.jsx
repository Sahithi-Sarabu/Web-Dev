import React from 'react';
import Explore from './Explore';
import Home from './Home';
import Profile from './Profile';
import Logout from './Logout';

const Options = ({setUserState, setError, setHomePage , setProfilePage, setExplorePage, 
    setOtherUserPage, setTweetDetailsPage}) => {

    const logout = ()=>{
        setUserState({
            isLoggedIn: false
        });
        setHomePage(false);
        setProfilePage(false);
        setExplorePage(false);
        setOtherUserPage({
            isOtherPage:false
        })
        setTweetDetailsPage({
            isTweetDetailsPage:false
        })
    };

    return (
        <div>
            <ul>
                <li><Home setHomePage={setHomePage} setExplorePage={setExplorePage}setProfilePage={setProfilePage} 
                setOtherUserPage={setOtherUserPage} setTweetDetailsPage={setTweetDetailsPage}></Home></li>
                <li><Explore setHomePage={setHomePage} setExplorePage={setExplorePage}setProfilePage={setProfilePage} 
                setOtherUserPage={setOtherUserPage} setTweetDetailsPage={setTweetDetailsPage}></Explore></li>
                <li><Profile setHomePage={setHomePage} setExplorePage={setExplorePage}setProfilePage={setProfilePage} 
                setOtherUserPage={setOtherUserPage} setTweetDetailsPage={setTweetDetailsPage}></Profile></li>
                <li><Logout onLogout={ logout } setError={ setError }/></li>
            </ul>
        </div>
    );
};

export default Options;