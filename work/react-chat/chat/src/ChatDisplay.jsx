import React from 'react';

const ChatDisplay = ({ users, messages }) =>{

    const userList = Object.values(users).map( (user) => 
        <li key={user.toString()}>
            <span className="user">{user}</span>
        </li>
    );

    const messageList = Object.values(messages).map( (message) =>
        <li key={message.user + message.time}>
        <div className="user-info">
          <span className="user-name">{message.user}</span>
          <span className="time">{message.time}</span>
        </div>
        <span className="message">{message.message}</span>
        </li>
    );

    return (
        <div className="chat-content">
            <ul className="users">{ userList }</ul>
            <ul className="messages">{ messageList }</ul>
        </div>
    )

}

export default ChatDisplay;