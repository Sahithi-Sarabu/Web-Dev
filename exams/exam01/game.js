const words = require('./words');


let users = {};


	function compare(word,guess){
		let matches = 0;
		const letterCount = {};
		for( let letter of word.toLowerCase() ) {
			letterCount[letter] = letterCount + 1 || 1;
		}
		for( let letter of guess.toLowerCase() ) {
			if( letterCount[letter] ) {
				letterCount[letter] -= 1;
				matches += 1;
			}
		}
		return matches;
	}
	
	function pickWord(wordList){
		let picked = wordList[Math.floor(Math.random() * wordList.length)];
		console.log("Selected Word: "+picked);
		return picked;
	}
	
	function exactMatch(word, guess) {
		  return word.toUpperCase() === guess.toUpperCase();
	}
	
	function takeTurn(guess,uid) {
		if(users[uid].pickedWord.length != guess.length || !words.wordsList.includes(guess.toUpperCase())){
			users[uid].gameResponse = `Invalid Word Entered!! Try Again`;
			return;
		}else{
			let match = 0;
			users[uid].turns++;
		    if(exactMatch(users[uid].pickedWord, guess)) {
		    	match = users[uid].pickedWord.length;
		    	users[uid].gameResponse= `Congrats!  You won in ${users[uid].turns} turns!`;
		    	users[uid].gameOver= true;
		        return;
		    }
		    match = compare(users[uid].pickedWord, guess);
		    users[uid].gameResponse= `You matched ${match} letters out of ${users[uid].pickedWord.length}`;
		    addWord({guess,match}, uid);
		  }
		
	}
	
	
	function addWord({guess,match},uid){
		users[uid].wordsGuessed.push({guess,match});
	}
	
	function playAgain(uid){
		users[uid].turns = 0;
		users[uid].pickedWord = pickWord(words.wordsList);
		users[uid].wordsGuessed = [];
		users[uid].gameOver = false;
		users[uid].gameResponse = "";
		
	}
	
	
	function createUser(username){
		const uid = Math.floor(Math.random() * 10000);
		users[uid] = {
			username,
			turns : 0,
			wordsGuessed : [],
			gameResponse : "",
			pickedWord :process.env.OVERRIDE || pickWord(words.wordsList),
			gameOver:false
		};
		return uid;
	}
	
	
	
	const gameLogic = {
		compare,
		addWord,
		exactMatch,
		takeTurn,
		playAgain,
		createUser,
		users
	};


module.exports = gameLogic;