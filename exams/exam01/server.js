const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT= 3000;

const gameWeb= require('./gameWeb');
const words = require('./words');
const gameLogic = require('./game');
const gameOver = require('./gameOverWeb');
const mainPage = require('./createUserWeb');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/',(req,res) => {
	let uid = req.cookies.uid;
	if(!gameLogic.users[uid]){
		uid = '';
		res.cookie('uid', '');
	}
	if(!uid){
		 res.redirect('/mainPage');
	}else{
		if(gameLogic.users[uid].gameOver){
			res.redirect('/gameOver');
		}else{
			res.send(gameWeb.gamePage(words,gameLogic,uid));
		}
	}
});

app.get('/mainPage',(req,res) =>{
	res.send(mainPage.newUserPage());
});


app.post('/createUser',express.urlencoded({ extended: false }), (req, res) => {
	const { username } = req.body;
	const uid = gameLogic.createUser(username);
	res.cookie('uid',uid);
	res.redirect('/');
});

app.post('/guessWord', express.urlencoded({ extended: false }), (req, res) => {
	const { guess } = req.body;
	let uid = req.cookies.uid;
	gameLogic.takeTurn(guess,uid);
	if(gameLogic.users[uid].gameOver){
		res.redirect('/gameOver');
	}else{
		res.redirect('/');
	}
});

app.get('/gameOver' , (req,res) =>{
	let uid = req.cookies.uid;
	res.send(gameOver.gameOverPage(words,gameLogic,gameWeb,uid));
	
});

app.get('/playAgain',(req,res) =>{
	let uid = req.cookies.uid;
	gameLogic.playAgain(uid);
	res.redirect('/');
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));