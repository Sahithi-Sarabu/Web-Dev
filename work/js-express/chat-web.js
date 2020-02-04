const chatWeb = {
	userList: function( users ){
		return ` <ul class = "users"> ` + 
			Object.keys(users).map(user => {
				return `
				<li>
				  <div class = "user">
				    <span class = "username">${user}</span>
				  </div>
				</li>
				`;
				}).join('\n') +
		`</ul>`;
	},

	messageList: function( messages ){
		return ` <ol class = "messages"> ` +
			messages.map(message => {
				return `
				<li>
					<div class = "message">
						<div class = "meta-info">
							<div class = "sender-info">
								<span class = "username">${message.sender}</span>
							</div>
							<div class = "message-info">
								<span class = "timestamp">${message.timestamp}</span>
							</div>
						</div>
						<p class = "message-text">${message.text}</p>
					</div>
				</li> `;
			}).join('\n') +
			`</ol> `;
	},

	chatPage: function(chat){
        //console.log(chat);
        return `<!DOCTYPE html>
        <html>
           <head>
               <link rel="stylesheet" href="chat.css"/>
               <title>Chat</title>
           </head>
           <body>
               <div id="chat-app">
                   <div class="display-panel">
                       ${chatWeb.userList(chat.users)}
                       ${chatWeb.messageList(chat.messages)}
                   </div>
                   <div class="outgoing">
		   	<form action="/sendMessage" method="post">
				<input class="hidden" name="sender" value= ""placeholder = "Name" required/>
				<input class="to-send" name="text" value= "" placeholder = "Enter to send" required/>
				<button type="submit">Send</button>
                   </div>
               </div>
           </body>
        </html>`;
    }
};

module.exports = chatWeb;

