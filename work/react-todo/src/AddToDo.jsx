import React, { useState} from 'react';
//import UserContext from './UserContext';
import {fetchTodo, fetchAllTodos} from './services';

const AddToDo = ({onSend, userState, setUserState, setError}) => {
    const [todo, setTodo] = useState('');

    const sendTodo = (e) =>{
        const task = {task: todo, status: false};
        fetchTodo(task , userState.username)
        .then( () =>{
            setTodo('');
            fetchAllTodos(userState.username)
            .then( (todos) => {
                onSend(todos.data);
            }) 
        })
        .catch( err => {
             setError(err.message);
            if(err.message === 'no valid session' || err.message === 'action not permitted'){
                setUserState({
                    isLoggedIn: false
                });
            }
        })
    }

    const onInput = (e) =>{
        setTodo(e.target.value);
    }

    return (
        <div className="to-send">
            <input className="new-todo" value={ todo } onChange={ onInput } placeholder="Enter message"/>
            <button className="add" onClick={ sendTodo }>Send</button>
        </div>

    );
};

export default AddToDo;