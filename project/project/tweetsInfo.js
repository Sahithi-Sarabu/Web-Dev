const {users} = require('./users');
const { tweets } = require('./tweets');
const {sessions} = require('./session');

const getTweets = (id) => {
    if(!users[id]){
        name = sessions[id].name;
        users[id] = {
            tweets:[],
            following:[],
            followers:[],
            likedTweets:[],
            id,
            name
        };
        return users[id].tweets;
    }else{
        const userTweets = users[id].tweets;
        const allTweets = [];
        for(i =0; i< userTweets.length; i++){
            allTweets.push(tweets[userTweets[i]]);
        }
        const following = users[id].following;
        for(i=0; i<following.length; i++){
            const user = users[following[i]];
            for(j=0; j< user.tweets.length;j++){
                allTweets.push(tweets[user.tweets[j]]);
            }
        }
        allTweets.sort(isSorted);
        return allTweets;
    }
}

const getUserTweets = (id) => {
    const userTweetIds = users[id].tweets;
    const allTweets = [];
    userTweetIds.forEach( id =>{
        allTweets.push(tweets[id]);
    })
    const liked = users[id].likedTweets;
    liked.forEach( id=> {
        if(!allTweets.includes(tweets[id])){
            allTweets.push(tweets[id]);
        }
    })
    return allTweets.sort(isSorted);
}

const isSorted = (tweet1, tweet2) => {
    return tweet2.time-tweet1.time;
}

const updateLikes = (tweetId, userId) => {
    const liked = users[userId].likedTweets;
    Object.values(tweets).forEach( tweet => {
        if(tweet.tweetId == tweetId){
            if(liked.includes(tweetId)){
                const index = liked.indexOf(tweetId);
                if(index > -1){
                    liked.splice(index, 1);
                }
                tweet.likes--;
            }else{
                tweet.likes++;
                liked.push(tweetId);
            }
        }
    })
}

const updateFollowStatus = (loggedInUserId, otherUserId) => {
    const followingUsers = users[loggedInUserId].following;
    if(followingUsers.includes(otherUserId)){
        const index = followingUsers.indexOf(otherUserId);
        if(index > -1){
            followingUsers.splice(index,1);
        }
        const otherIndex = users[otherUserId].followers.indexOf(loggedInUserId);
        if(otherIndex > -1){
            users[otherUserId].followers.splice(otherIndex, 1);
        }
    }else{
        followingUsers.push(otherUserId);
        users[otherUserId].followers.push(loggedInUserId);
    }
}

const getAllTweets = (userId) => {
    const tweetsList = [];
    Object.values(tweets).forEach( tweet => {
        if(tweet.userId != userId){
            tweetsList.push(tweet);
        }
    });
    return tweetsList.sort(isSorted);
}

const deleteTweet = (tweetId) => {
    const tweet = tweets[tweetId];
    const userTweets = users[tweet.userId].tweets;
    const index = userTweets.indexOf(parseInt(tweetId));
    if(index > -1){
        userTweets.splice(index, 1);
    }
    delete tweets[tweetId];
}

module.exports = {
    getTweets,
    updateLikes,
    getAllTweets,
    updateFollowStatus,
    deleteTweet,
    getUserTweets
};