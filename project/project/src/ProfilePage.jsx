import React, { useEffect, useState } from 'react';
import Options from './Options';
import {fetchProfileDetails, fetchUserSpecificTweets} from './services';
import TweetDisplay from './TweetDisplay';

const ProfilePage = ({isProfilePage,setTweetDetailsPage, otherUserPage, isExplorePage, userState, setUserState, 
    setError, setHomePage, setProfilePage, setExplorePage, setOtherUserPage}) => {
    const [profileDetails, setProfileDetails] = useState([]);
    const [tweets, setAllTweets] = useState([]);

    const getProfileDetails = () => {
        fetchProfileDetails(userState.id)
        .then(profile => {
            setProfileDetails(profile);
            fetchUserSpecificTweets(userState.id)
            .then( tweetsList =>{
                setAllTweets(tweetsList);
            })
        })
        .catch(err =>{
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
        });
    };

    useEffect( () => {
        const interval = setInterval( () => {
            getProfileDetails();
        }, 2500);
        setError('');
        return function cleanUp(){
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="home-page">
            <div className="options">
                <Options setUserState={setUserState} setError={ setError } setHomePage={setHomePage} setProfilePage={setProfilePage} 
                setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage}setTweetDetailsPage={setTweetDetailsPage}></Options>
            </div>
            <div className="container">
                <div className="profile-info">
                    <img src="/profile.png" alt="avatar" className="avatar"></img>
                    <span className="name">{profileDetails.name}</span>
                    <br/>
                    <span className="follow">{(!profileDetails.following || !profileDetails.following.length) ? 0 : profileDetails.following.length}</span> 
                    <label className="text">Following</label>
                    <span className="follow">{(!profileDetails.followers || !profileDetails.followers.length) ? 0 : profileDetails.followers.length}</span>
                    <label>Followers</label>
                </div>
                <div>
                    <TweetDisplay isProfilePage={isProfilePage} setUserState={setUserState} setTweetDetailsPage={setTweetDetailsPage} 
                    otherUserPage={otherUserPage} isExplorePage={isExplorePage} userState={userState} tweets={tweets} 
                    setAllTweets={setAllTweets} setError={setError} setHomePage={setHomePage} setProfilePage={setProfilePage} 
                    setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage}/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;