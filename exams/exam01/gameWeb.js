const gameWeb = {
		
		guessedList: function(guessed){
			return `
			<ol class= "words-guess">` +
			guessed.map( guessPair=>{ 
				return `<li>
				   <span class = word-typed>${guessPair.match} letters of '${guessPair.guess}' match with secret word</span>
				</li>`
			}).join(' ') +
			`<ol>`;
		},
			
		gamePage: function(words,game,uid){
			return `<!DOCTYPE html>
			<html>
			  <head>
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <link rel ="stylesheet" href="game.css"/>
			    <title>Guessing Game</title>
			  </head>
			  <body class= "game-body">
			    <h1>Guess What!</h1>
		          <h2 class= "game-head">Start your Guess: The secret word is ${game.users[uid].pickedWord.length} letters</h2>
			        <div class="outer-display">
			          <div>${gameWeb.wordList(words.wordsList)}</div>
			          <div class= "display">
			            <p class="turns-display">Number of turns: ${game.users[uid].turns}</p>
			            ${gameWeb.playGame()}
			            <p class="status-of-game"> ${game.users[uid].gameResponse}</p>
			          </div>
			          <div>${gameWeb.guessedList(game.users[uid].wordsGuessed)}</div>
			        </div>
			       <script type= "text/javascript">
			          function checkSpace(event){
			            if(event.which ==32){
			              event.preventDefault();
						  return false;
					     }
					   }
			      </script>	
			  </body>
			  </head>
			  </html>`;
		},
		
		
		playGame: function(){
			return `
			<div>
			  <form action="/guessWord" method="post">
			    <input type="text" id= "guess-text" name="guess" value="" placeholder="Guess your Word" ;onkeypress="checkSpace(event)" required/><br>
			    <input type="submit" id= "submit-btn" value="Submit"/>
			  </form>
		   </div> `;
		},
		
		
		
		
		wordList: function(wordsList){
			return `
			<ol class="words-list" >` + 
			  wordsList.map(word =>` 
			  <li>
			   <span class="word">${word}</span>
			   </li>
			  `).join('') +
			`</ol>`;
		}
		
};
module.exports = gameWeb;