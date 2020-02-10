const newUser = {
		
		newUserPage : function(){
			return `<!DOCTYPE html>
			<html>
			  <head>
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <link rel ="stylesheet" href="game.css"/>
			    <title>Guessing Game</title>
			  </head>
			  <body class= "user-body">
			    <h1 class ="user-head">Login</h1>
			        ${newUser.createUser()}
			       <script type= "text/javascript">
			          function checkSpace(event){
			      	     if(event.which ==32){
						    event.preventDefault();
						    return false;
					     }
				      }
			      </script>	
			    </div>
			  </body>
			  </head>
			  </html>`;
		},
		
		createUser: function(){
			return `
			<form action="/createUser" method="post">
			     <input type="text" id="text-box" name="username" value="" placeholder="Enter your name" onkeypress="checkSpace(event)" required/><br>
			     <input type="submit" id= "create-btn" value="Create"/>
			  </form>
		    `
		}
		
};

module.exports = newUser;