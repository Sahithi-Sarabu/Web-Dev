import React, {useState, useEffect} from 'react';
import Options from './Options';
import {fetchUserTweets, postTweet} from './services';
import TweetDisplay from './TweetDisplay';

const HomePage = ({isProfilePage, setTweetDetailsPage,otherUserPage, isExplorePage, userState, setUserState, 
    setError, setHomePage, setProfilePage, setExplorePage, setOtherUserPage}) => {
    const [tweet, setTweet] = useState('');
    const [allTweets, setAllTweets] = useState([]);

    const getTweets = () => {
        fetchUserTweets(userState.id)
        .then( tweetsList => {
            setAllTweets(tweetsList);
            setError('');
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

    const addTweet = () => {
        if(tweet){
            postTweet(tweet)
            .then( tweetsList => {
                setAllTweets(tweetsList);
                setTweet('');
                setError('');
            })
            .catch(err => {
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
        
    }

    const input = (e) => {
        setTweet(e.target.value);
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
                setTweetDetailsPage={setTweetDetailsPage}/>
            </div>
            <div className="container">
                <div className="input-container">
                    <img src="/profile.png" alt="avatar" className="avatar"></img>
                    <textarea className="input" placeholder="What's happening?" onChange={input} value={tweet} maxLength="250"></textarea>
                    <br/>
                    <button className="submit" onClick={addTweet} disabled={!tweet}>Zweet</button>
                </div>
                <TweetDisplay isProfilePage={isProfilePage} setUserState={setUserState} setTweetDetailsPage={setTweetDetailsPage} 
                otherUserPage={otherUserPage} isExplorePage={isExplorePage} userState={userState} tweets={allTweets} 
                setAllTweets={setAllTweets} setError={setError} setHomePage={setHomePage} setProfilePage={setProfilePage} 
                setExplorePage={setExplorePage} setOtherUserPage={setOtherUserPage}/>
            </div>
        </div>
    );
}

export default HomePage;