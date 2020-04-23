import React from 'react';

const Home = ({setHomePage, setExplorePage, setProfilePage, setOtherUserPage, 
    setTweetDetailsPage}) => {
    const changePage = () => {
        setHomePage(true);
        setProfilePage(false);
        setExplorePage(false);
        setOtherUserPage({
            isOtherPage:false
        })
        setTweetDetailsPage({
            isTweetDetailsPage:false
        })
    }
    return (
        <button className="button" onClick={changePage}><img src="/home.png" alt="avatar" className="image"></img>Home</button>
    )
}

export default Home;