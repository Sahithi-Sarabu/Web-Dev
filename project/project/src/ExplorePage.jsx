import React, { useState,useEffect} from 'react';
import Options from './Options';
import TweetDisplay from './TweetDisplay';
import {fetchAllTweets} from './services';

const ExplorePage = ({isProfilePage,setTweetDetailsPage, otherUserPage, isExplorePage, userState, setUserState, 
    setError, setHomePage, setProfilePage, setExplorePage, setOtherUserPage}) => {
    const [tweets, setAllTweets] = useState([]);

    const getTweets = () => {
        fetchAllTweets()
        .then( tweetsList =>{
            setAllTweets(tweetsList);
        })
        .catch( err=>{
            setError(err.error);
            if(err.error === 'Unauthorized user' || err.error === 'User not allowed'){
                setUserState({
                    isLoggedIn: false
                });
                setHomePage(false);
                setExplorePage(false);
                setProfilePage(false);
                setOtherUserPage({
                    isOtherPage:false
                })
                setTweetDetailsPage({
                    isTweetDetailsPage:false
                })
            }
        })
    }

    useEffect( () => {
        const interval = setInterval( () => {
            getTweets();
        }, 2500);
        setError('');
        return function cleanUp(){
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="home-page">
            <div className="options">
                <Options setUserState={setUserState} setError={ setError } setHomePage={setHomePage} 
                setProfilePage={setProfilePage} setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage} 
                setTweetDetailsPage={setTweetDetailsPage}></Options>
            </div>
            <div className="container">
                <TweetDisplay isProfilePage={isProfilePage} setUserState={setUserState} setTweetDetailsPage={setTweetDetailsPage} 
                otherUserPage={otherUserPage} isExplorePage={isExplorePage} userState={userState} tweets={tweets} 
                setAllTweets={setAllTweets} setError={setError} setHomePage={setHomePage} setProfilePage={setProfilePage} 
                setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage}/>
            </div>
        </div>
    );
};

export default ExplorePage;