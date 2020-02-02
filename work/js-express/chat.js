const chat = {
	users: {
	},

	messages: [
	],

	addMessage: function({text, sender, timestamp= new Date()}){
		if(!chat.users[sender]){
			chat.users[sender] = sender;
		}
		chat.messages.push({text,sender,timestamp});
	},

};


module.exports = chat;
