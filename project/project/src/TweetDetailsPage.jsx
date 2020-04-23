import React, {useState,useEffect} from 'react';
import Options from './Options';
import { fetchTweet, updateLikes, deleteTweet } from './services';

const TweetDetailsPage = ({tweetDetailsPage, setTweetDetailsPage, userState, setUserState, setError, 
    setHomePage, setProfilePage, setExplorePage, setOtherUserPage}) => {
    const [tweetInfo, setTweetInfo] = useState([]);

    const getTweetDetails = () => {
        fetchTweet(tweetDetailsPage.tweetId)
        .then( tweet => {
            setTweetInfo(tweet);
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

    const changeLikes = (e) => {
        updateLikes(e.target.dataset.id)
        .then( ()=> {
            fetchTweet(tweetDetailsPage.tweetId)
            .then( tweet => {
                setTweetInfo(tweet);
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

    const deleteGiven = (e) => {
        deleteTweet(e.target.dataset.id)
        .then( ()=> {
            setProfilePage(true);
            setExplorePage(false);
            setHomePage(false);
            setOtherUserPage({
                isOtherPage:false
            })
            setTweetDetailsPage({
                isTweetDetailsPage:false
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

    const deleteButton = (tweet) => {
        if(tweet.userId == userState.id){
            return <button className="delete" onClick={deleteGiven} data-id={tweet.tweetId}></button>
        }
    }
    

    const convertTime = ( time) => {
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

    useEffect( () => {
        getTweetDetails();
        setError('');
    }, []);

    return (
        <div className="home-page">
            <div className="options">
                <Options setUserState={setUserState} setError={ setError } setHomePage={setHomePage} setProfilePage={setProfilePage} setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage} setTweetDetailsPage={setTweetDetailsPage}/>
            </div>
            <div className="tweet-container">
                <div className="tweet-data">
                    <div className="user-info">
                        <img src="/profile.png" alt="avatar" className="avatar-display" data-id={tweetInfo.userId} onClick={ changePage }></img>
                        <span className="name" data-id={tweetInfo.userId} onClick={ changePage } >{tweetInfo.user}</span>
                        <span className="time">{convertTime(tweetInfo.time)}</span>
                    </div>
                    <p className="tweet">{tweetInfo.tweet}</p>
                </div>
                <div className="meta-info">
                    <span className="follow">{tweetInfo.likes}</span>
                    <label className="text">Likes</label>
                </div>    
                <div className="comments">
                    <div className="like">
                        <button className="likes" onClick={changeLikes} data-id={tweetInfo.tweetId}></button>
                        <label className="count">{tweetInfo.likes}</label>
                    </div>    
                    {deleteButton(tweetInfo)}   
                </div>
            </div>
        </div>  
    )
}

export default TweetDetailsPage;