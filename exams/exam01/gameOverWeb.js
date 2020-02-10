const gameOverWeb = {
		
		gameOverPage : function(words,game,gameWeb,uid){
			return `<!DOCTYPE html>
			<html>
			  <head>
			    <link rel = "stylesheet" href="game.css"/>
			  </head>
			  <body class="gameOver-body">
			    <h1>Guess What!</h1>
			    <div class= gameOver-display>
			    <h2 class="status-of-gameOver"> ${game.users[uid].gameResponse}</h2>
			      <form action="/playAgain" method="get">
			         <input type="submit" id= "gameOver-btn" value="Play Again">
			         </form>
			    </div>
			  </body>
			  </head>
			  </html>`;
		},
		
};

module.exports = gameOverWeb;