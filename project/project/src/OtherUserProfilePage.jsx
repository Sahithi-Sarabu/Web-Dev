import React, {useState, useEffect} from 'react';
import {fetchProfileDetails, fetchUserSpecificTweets,updateFollowStatus} from './services';
import Options from './Options';
import TweetDisplay from './TweetDisplay';

const OtherUserProfilePage = ({isProfilePage,setTweetDetailsPage,isExplorePage,otherUserPage,userState, setUserState, 
    setError, setHomePage, setProfilePage, setExplorePage, setOtherUserPage}) => {
    const [userDetails, setuserDetails] = useState([]);
    const [tweets, setAllTweets] = useState([]);

    const getProfileDetails = () => {
        fetchProfileDetails(otherUserPage.otherUser)
        .then( profile =>{
            setuserDetails(profile);
            fetchUserSpecificTweets(otherUserPage.otherUser)
            .then(tweetsList =>{
                setAllTweets(tweetsList);
            })
        })
        .catch( err=> {
            setError(err.error);
            if(err.error === 'Unauthorized user' || err.error === 'User not allowed'){
                setUserState({
                    isLoggedIn: false
                });
                setHomePage(false);
                setExplorePage(false);
                setProfilePage(false);setOtherUserPage({
                    isOtherPage:false
                })
                setTweetDetailsPage({
                    isTweetDetailsPage:false
                })
            }
        })
    }

    const changeStatus = () => {
        updateFollowStatus(otherUserPage.otherUser)
        .then( userInfo => {
            setuserDetails(userInfo);
            fetchUserSpecificTweets(otherUserPage.otherUser)
            .then(tweetsList => {
                setAllTweets(tweetsList);
                
            })
        })
        .catch( err => {
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
                <Options setUserState={setUserState} setError={ setError } setHomePage={setHomePage} setProfilePage={setProfilePage} setExplorePage={setExplorePage} 
                setOtherUserPage={setOtherUserPage} setTweetDetailsPage={setTweetDetailsPage}></Options>
            </div>
            <div className="container">
                <div className="profile-info">
                    <img src="/profile.png" alt="avatar" className="avatar"></img>
                    <span className="name">{userDetails.name}</span>
                    <br/>
                    <span className="follow" data-id={userDetails.id}>{(!userDetails.following || !userDetails.following.length) ? 0 : userDetails.following.length}</span> 
                    <label className="text" data-id={userDetails.id}>Following</label>
                    <span className="follow">{(!userDetails.followers || !userDetails.followers.length) ? 0 : userDetails.followers.length}</span>
                    <label data-id={userDetails.id}>Followers</label>
                    <button className="to-follow" onClick={changeStatus}> {userDetails.followers && userDetails.followers.includes(userState.id) ? "Following" : "Follow"}</button>
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
}

export default OtherUserProfilePage;