import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchMessages,} from './services';
import Logout from './Logout';
import ChatDisplay from './ChatDisplay';
import SendMessage from './SendMessage';

const Chat = ({setUserState, setError }) =>{
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const getUsers = () =>{
        fetchUsers()
        .then( userList =>{
            setUsers(userList);
        })
        .catch( err =>{
            setError(err.error);
        });
    };

    const getMessages = () => {
        fetchMessages()
        .then( messageList =>{
            setMessages(messageList);
        })
        .catch(err =>{
            setError(err.error);
        });
    };

    const logout = ()=>{
        setUserState({
            isLoggedIn: false
        });
    };

    const send = (messagesList) =>{
        setMessages(messagesList);
    }

    useEffect( () => {
        getUsers();
        getMessages();
        setError('');
    }, []);

    return (
        <div className="chat">
            <h2>Chat On</h2>
            <div className="chat-area">
                <Logout onLogout={ logout } setError={ setError }/>
                <SendMessage onSend={ send } setError={ setError } setUserState = {setUserState}/>
                <ChatDisplay users={ users } messages={ messages }/>
            </div>
        </div>

    )
}

export default Chat;