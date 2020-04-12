const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { v4: uuidv4} = require('uuid');
const PORT = 4000;
const chat = require('./chatInfo');

app.use(express.static('./build'));
app.use(cookieParser());

app.get('/session', (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.sendStatus(403);
        return;
    }
    if(uID && !chat.users[uID]){
		res.clearCookie('uid');
        res.sendStatus(403);
        return;
	}
	res.status(200).json(chat.users[uID]);
});

app.post('/session', express.json(), (req,res) => {
    const name = req.body.name;
    if(!name || name.toLowerCase().includes("dog")){
		res.status(401).json({error: 'Enter a valid name'});
		return;
    }
    if(!name.match(/^[A-Za-z0-9_-]{2,26}$/)){
        res.status(401).json({ error: 'Name contains invalid characters'});
        return;
    }
    const uID = uuidv4();
    chat.users[uID] = name;
    res.cookie('uid', uID);
    res.json(chat.users[uID]);
});

app.delete('/session', (req, res) =>{
    uID = req.cookies.uid;
    res.clearCookie('uid');
    delete chat.users[uID];
    res.sendStatus(200);
    return;
});

app.get('/users', (req,res) =>{
    const uID = req.cookies.uid;
	if(!uID){
		res.status(401).json({error: 'Unauthorized user'});
		return;
	}
	if(uID && !chat.users[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
	}
    res.json(chat.users);
});

app.get('/messages', (req,res) =>{
    const uID = req.cookies.uid;
	if(!uID){
		res.status(401).json({error: 'Unauthorized user'});
		return;
	}
	if(uID && !chat.users[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
	}
    res.json(chat.messages);
});

app.post('/messages', express.json(), (req,res) =>{
    const message = req.body.message;
    uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Unauthorized user'});
		return;
	}
	if(uID && !chat.users[uID]){
		res.status(403).json({error: 'User not allowed' });
		return;
	}
	if(!message || message.trim().length == 0 ) {
		res.status(400).json({ error: 'Message not entered'});
		return;
	}
    chat.messages.push({ user: chat.users[uID], time: new Date().toLocaleTimeString(), message: message});
    res.json(chat.messages);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));