import React from 'react';

const Explore = ({setHomePage, setExplorePage, setProfilePage,setOtherUserPage,
   setTweetDetailsPage}) => {
   const changePage = () => {
      setExplorePage(true);
      setHomePage(false);
      setProfilePage(false);
      setOtherUserPage({
         isOtherPage: false
      })
      setTweetDetailsPage({
         isTweetDetailsPage:false
      })
   }
     return (
        <button className="button" onClick={changePage}><img src="/explore.png" alt="avatar" className="image"></img>Explore</button>
     )
};

export default Explore;