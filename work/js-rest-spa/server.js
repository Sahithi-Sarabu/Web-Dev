"use strict";
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const items = {};
const users = {};

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/load', (req, res) => {
	let uid = req.cookies.uid;
	if(uid && !users[uid]){
		res.cookie('uid', '');
		res.status(401);
	}
	res.send(uid)
});

app.get('/items/', (req, res) => {
	const uid = req.cookies.uid;
	if(!uid){
		res.status(401).json({error: 'unauthorized'});
		return;
	}
	if(uid && !users[uid]){
		res.status(403).json({error: 'forbidden' });
		return;
	}
	res.json(Object.values(items));
});

app.post('/items/', express.json(), (req, res) => {
	const name = req.body.name;
	const quantity = req.body.quantity;
	const id = name;
	const uid = req.cookies.uid;
	if(!uid){
		res.status(401).json({error: 'unauthorized'});
		return;
	}
	if(uid && !users[uid]){
		res.status(403).json({error: 'forbidden' });
		return;
	}
	if(!name) {
		res.status(400).json({ error: 'missing-name' });
		return;
	}
	if(items[id]) {
		res.status(409).json({ error: 'duplicate' });
		return;
	}
	items[id] = {id: id, name: name, quantity:quantity}
	res.json(Object.values(items));
});

app.post('/session', express.json(), (req,res) =>{
	const name = req.body.name;
	if(name.indexOf(' ') >=0 || name.includes("dog")){
		res.status(401).json({error: 'failed-login'});
		return;
	}
	const uid = Math.floor(Math.random() * 10000);
	users[uid] = name;
	res.cookie('uid', uid);
	res.json(Object.values(items));
});

app.get('/session', (req,res) =>{
	res.clearCookie('uid');
	res.send("true");
	return;
});

app.delete('/items/:id', (req,res) =>{
	const id = req.params.id;
	const uid = req.cookies.uid;
	if(!uid){
		res.status(401).json({error: 'unauthorized'});
		return;
	}
	if(uid && !users[uid]){
		res.status(403).json({error: 'forbidden' });
		return;
	}
	if(!id) {
		res.status(400).json({ error: 'missing-name' });
		return;
	}
	delete items[id];
	res.json(Object.values(items));
});

app.patch('/items/:id', express.json(),(req,res) => {
	const id = req.params.id;
	const uid = req.cookies.uid;
	if(!uid){
		res.status(401).json({error: 'unauthorized'});
		return;
	}
	if(uid && !users[uid]){
		res.status(403).json({error: 'forbidden' });
		return;
	}
	if(!id) {
		res.status(400).json({ error: 'missing-name' });
		return;
	}
	const newQuantity = req.body.quantity;
	if(!items[id]){
		res.status(403).json({error: 'modify-error'});
		return;
	}
	items[id].quantity = newQuantity;
	res.json(Object.values(items));
});

app.listen(3000 , () => console.log('Listening on http://localhost:3000/'));
