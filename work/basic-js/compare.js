"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
  word = word.toLowerCase();
  guess = guess.toLowerCase();
	let wordArr = [];
	for(let i =0; i< word.length; i++){
		if(!wordArr.includes(word[i])){
			wordArr.push(word[i]);
		}
	}
  
	let guessArr = [];
	for(let j =0; j< guess.length; j++){
		if(!guessArr.includes(guess[j])){
			guessArr.push(guess[j]);
		}
	}
  
	let count = 0;
	for(let i = 0; i< wordArr.length; i++){
		if(guessArr.includes(wordArr[i])){
			count++;
		}
	}
  return count; // this line is wrong
}
