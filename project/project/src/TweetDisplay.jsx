import React from 'react';
import {updateLikes, fetchAllTweets, fetchUserSpecificTweets,fetchUserTweets,deleteTweet} from './services';

const TweetDisplay = ({isProfilePage,setUserState, setTweetDetailsPage, otherUserPage, 
    isExplorePage, userState, tweets, setAllTweets, setError, setHomePage, setProfilePage, 
    setExplorePage,setOtherUserPage}) => {

    const changeLikes = (e) => {
        updateLikes(e.target.dataset.id)
        .then( ()=> {
            if(isExplorePage){
                fetchAllTweets()
                .then( tweetList => {
                    setAllTweets(tweetList);
                })
            }else if(otherUserPage.isOtherPage){
                fetchUserSpecificTweets(otherUserPage.otherUser)
                .then(tweetList => {
                    setAllTweets(tweetList);
                })
            }else if(isProfilePage){
                fetchUserSpecificTweets(userState.id)
                .then(tweetList => {
                    setAllTweets(tweetList);
                })
            }else{
                fetchUserTweets(userState.id)
                .then(tweetList => {
                    setAllTweets(tweetList);
                })
            }
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

    const deleteGiven = (e) => {
        deleteTweet(e.target.dataset.id)
        .then( ()=> {
            if(isExplorePage){
                fetchAllTweets()
                .then( tweetList => {
                    setAllTweets(tweetList);
                })
            }else if(otherUserPage.isOtherPage){
                fetchUserSpecificTweets(otherUserPage.otherUser)
                .then(tweetList => {
                    setAllTweets(tweetList);
                })
            }else if(isProfilePage){
                fetchUserSpecificTweets(userState.id)
                .then(tweetList => {
                    setAllTweets(tweetList);
                })
            }else{
                fetchUserTweets(userState.id)
                .then(tweetList => {
                    setAllTweets(tweetList);
                })
            }
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

    const changePage = (e) => {
        const otherUser = e.target.dataset.id;
        const self = userState.id;
        if(otherUser == self){
            setProfilePage(true);
            setOtherUserPage({
                isOtherPage:false,
            });
        }else{
            setOtherUserPage({
                isOtherPage:true,
                otherUser: otherUser
            });
            setProfilePage(false);
        }
        setHomePage(false);
        setExplorePage(false);
        setTweetDetailsPage({
            isTweetDetailsPage:false
        })
    }

    const showDetails = (e) => {
        e.preventDefault();
        const tweetId = e.target.dataset.id;
        if(e.target.className != "name" && e.target.className != "time" && e.target.className != "likes" && 
           e.target.className != "delete" && e.target.className != "count" && e.target.className != "avatar-display"){
            setTweetDetailsPage({
                isTweetDetailsPage:true,
                tweetId:tweetId
            });
            setHomePage(false);
            setExplorePage(false);
            setProfilePage(false);
            setOtherUserPage({
                isOtherPage:false
            });
        }
    }

    const deleteButton = (tweet) => {
        if(tweet.userId == userState.id){
            return <button className="delete" onClick={deleteGiven} data-id={tweet.tweetId}></button>
        }
    }
    

    const convertTime = (time) => {
        const lapsed = (Date.now() - time)/1000;
        if(lapsed < 60){
            return Math.floor(lapsed) + 's';
        }else if(lapsed >= 60 && lapsed < 3600){
            return Math.floor(lapsed/60) + 'min';
        }else if (lapsed >= 3600 && lapsed < 86400) {
            return Math.floor(lapsed/3600) + 'h';
        }else if(lapsed >= 86400 && lapsed < 31536000){
            const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const date = new Date(time);
            return  shortMonths[date.getMonth()] + " " + date.getDate();
        }else{
            const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const date = new Date(time);
            return  shortMonths[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
        }
    }

    const tweetList = Object.values(tweets).map((tweet) => {
        if(tweet){
            return <li key={tweet.time + tweet.user} className="tweet-display">
                <a href={tweet.tweetId} onClick={showDetails} data-id={tweet.tweetId} className="main-header">
                    <div className="tweet-info" data-id={tweet.tweetId}>
                        <div className="tweet-data" data-id={tweet.tweetId}>
                            <div className="user-info" data-id={tweet.tweetId}>
                                <img src="/profile.png" alt="avatar" className="avatar-display" data-id={tweet.userId} onClick={ changePage }></img>
                                <span className="name" data-id={tweet.userId} onClick={ changePage } >{tweet.user}</span>
                                <span className="time">{convertTime(tweet.time)}</span>
                            </div>
                            <p className="tweet" data-id={tweet.tweetId}>{tweet.tweet}</p>
                        </div>
                        <div className="comments">
                            <div className="like">
                                <button className="likes" onClick={changeLikes} data-id={tweet.tweetId}></button>
                                <label className="count">{tweet.likes}</label>
                            </div>    
                            {deleteButton(tweet)}   
                        </div>
                    </div>
                </a>
            </li>
        }
    });

    return (
        <div className="tweet-panel">
            <ul className="tweets">{tweetList}</ul>
        </div>
    )
}

export default TweetDisplay;