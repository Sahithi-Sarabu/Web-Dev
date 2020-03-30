const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
let id = 0;
const recipeInfo = require('./recipeInfo');


app.use(express.static('./public'));
app.use(cookieParser());

app.get('/session', (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json(Object.values(recipeInfo.recipes));
        return;
    }
    if(uID && !recipeInfo.users[uID]){
		res.clearCookie('uid');
        res.status(403).json(Object.values(recipeInfo.recipes));
        return;
    }
	res.json(Object.values(recipeInfo.recipes));
});

app.post('/session', express.json(), (req,res) => {
    const name = req.body.name;
    if(!name || name.includes("dog")){
		res.status(401).json({error: 'Enter a valid name'});
		return;
    }
    if(name.indexOf(' ') >=0){
        res.status(401).json({ error: 'Name should not contain space'});
        return;
    }
    const uID = Math.floor(Math.random() * 10000);
    recipeInfo.users[uID] = name;
    res.cookie('uid', uID);
	res.json(Object.values(recipeInfo.recipes));
});

app.delete('/session', (req, res) =>{
    uID = req.cookies.uid;
    res.clearCookie('uid');
    delete recipeInfo.users[uID];
    res.sendStatus(200);
    return;
});

app.get(`/recipeDetails/:id`,(req,res) => {
    const recipeId = req.params.id;
    if(!recipeId){
        res.status(400).json( { error: 'No recipe available'});
        return;
    }
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Logged Out' , result: recipeInfo.recipes[recipeId]});
        return;
    }
    if(uID && !recipeInfo.users[uID]){
        res.status(403).json({error: 'Logged Out' , result: recipeInfo.recipes[recipeId]});
        return;
    }
    if(!recipeId){
        res.status(400).json( { error: 'No recipe available'});
        return;
    }
    res.json(recipeInfo.recipes[recipeId]); 
})

app.get('/recipes', (req,res) =>{
    res.json(Object.values(recipeInfo.recipes));
})

app.post('/recipes', express.json(), (req,res) => {
    const uID = req.cookies.uid;
    if(!uID){
        res.status(401).json({error: 'Login to add recipe' , result: Object.values(recipeInfo.recipes)} );
        return;
    }
    if(uID && !recipeInfo.users[uID]){
        res.status(403).json({error: 'Login to add recipe' , result: Object.values(recipeInfo.recipes)});
        return;
    }
    const name = recipeInfo.users[uID];
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const procedure = req.body.procedure;
    if(!title || !ingredients || !procedure){
        res.status(400).json({error: 'Fields cannot be empty', result: Object.values(recipeInfo.recipes)});
        return;
    }
    recipeInfo.recipes[++id] = {id: id, title:title, author:name, ingredients:ingredients, instructions: procedure};
    res.json({error: '', result: recipeInfo.recipes[id]});
})


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));