import React, { useState } from 'react';
import { fetchMessage} from './services';

const SendMessage = ({ onSend, setError, setUserState }) => {
    const [message, setMessage] = useState('');

    const sendMessage = (e) =>{
        fetchMessage(message)
        .then( messagesList =>{
            onSend(messagesList);
            setMessage('');
        })
        .catch( err =>{
            setError(err.error);
            if(err.error === 'Unauthorized user' || err.error === 'User not allowed'){
                setUserState({
                    isLoggedIn: false
                });
            }
        })
    }

    const onInput = (e) =>{
        setMessage(e.target.value);
    }


    return (
        <div className="to-send">
            <input className="new-message" value={ message } onChange={ onInput } placeholder="Enter message"/>
            <button className="add" onClick={ sendMessage }>Send</button>
        </div>
    )
}

export default SendMessage;