import React from 'react';

const Profile = ({setHomePage, setExplorePage, setProfilePage,setOtherUserPage, 
    setTweetDetailsPage}) => {
    const changePage = () => {
        setProfilePage(true);
        setHomePage(false);
        setExplorePage(false);
        setOtherUserPage({
            isOtherPage:false
        })
        setTweetDetailsPage({
            isTweetDetailsPage:false
        })
    }

    return (
        <button className="button" onClick={changePage}><img src="/avatar.png" alt="avatar" className="image"></img>Profile</button>
    )
};

export default Profile;