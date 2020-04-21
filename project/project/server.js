const express = require('express');
const cookieParser = require('cookie-parser');
const {sessions , addSession, deleteSession } = require('./session');
const {getTweets, updateLikes, getAllTweets, updateFollowStatus, deleteTweet,getUserTweets} = require('./tweetsInfo');
const {tweets} = require('./tweets');
const {users} = require('./users');
const auth = require('./auth');
const app = express();
const PORT = 4000;
let tweetId = 0;

app.use(express.static('./build'));
app.use(cookieParser());

app.get('/session' ,(req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.sendStatus(401);
        return;
    }
    if(!sessions[uID]){
        res.clearCookie('uid');
        res.sendStatus(403);
        return;
    }
    res.status(200).json(sessions[uID]);
});

app.post('/session', express.json(), (req,res) => {
    const name = req.body.name;
    if(!name){
        res.status(401).json({error: 'Enter a valid name'});
        return;
    }
    if(!auth.isPermitted(name)){
        res.status(403).json({error: 'Invalid characters entered'});
        return;
    }
    const session = addSession({name});
    res.cookie('uid', session.id);
    res.status(200).json(session);
});

app.delete('/session', (req,res) => {
    const uID = req.cookies.uid;
    if(!sessions[uID]){
        res.clearCookie('uid');
        res.sendStatus(403);
        return;
    }
    res.clearCookie('uid');
    deleteSession(uID);
    res.sendStatus(200);
})

app.get(`/tweet/:id`, (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const user = req.params.id;
    const allTweets = getTweets(user);
    res.json(allTweets);
});

app.get(`/userTweet/:id`, (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const user = req.params.id;
    const allTweets = getUserTweets(user);
    res.json(allTweets);
});

app.get(`/tweetInfo/:id`, (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const tweetId = req.params.id;
    return res.json(tweets[tweetId]);
})

app.get('/allTweets', (req, res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const tweetsList = getAllTweets(uID);
    res.json(tweetsList);
})

app.post('/tweet', express.json(), (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const tweet = req.body.tweet;
    if(!tweet || tweet.trim().length == 0 ) {
		res.status(400).json({ error: 'No Tweet entered'});
		return;
    }
    const username = sessions[uID].name;
    const tweetNo = ++tweetId;
    tweets[tweetNo] = {tweetId: tweetNo, userId: uID, user: username, tweet: tweet, time: Date.now(), likes:0};
    users[uID].tweets.push(tweetNo);
    const allTweets = getTweets(uID);
    res.json(allTweets);
})

app.put(`/tweet/:id`, (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const tweetId = req.params.id;
    updateLikes(tweetId, uID);
    res.sendStatus(200);
})

app.put('/tweet' , express.json() , (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const otherUser = req.body.otherUser;
    updateFollowStatus(uID, otherUser);
    res.json(users[otherUser]);
})

app.get(`/profileDetails/:id`, (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const userId = req.params.id;
    res.json(users[userId]);
});

app.delete(`/tweet/:id`, (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
    }
    if(uID && !sessions[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
    }
    const tweetId = req.params.id;
    if(tweets[tweetId].userId != uID){
        res.status(403).json({error: 'User not authorized to delete tweet' });
		return;
    }
    deleteTweet(tweetId);
    res.sendStatus(200);
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));