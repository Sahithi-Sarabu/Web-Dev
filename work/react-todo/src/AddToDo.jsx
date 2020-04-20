import React, { useState} from 'react';
import {fetchTodo, fetchAllTodos} from './services';

const AddToDo = ({onSend, userState, setUserState, setError, setTheme}) => {
    const [todo, setTodo] = useState('');

    const sendTodo = (e) =>{
        if(todo){
            const task = {task: todo, done: false};
            fetchTodo(task , userState.username)
            .then( () =>{
                setTodo('');
                fetchAllTodos(userState.username)
                .then( (todos) => {
                    onSend(todos.data);
                    setError('');
                }) 
            })
            .catch( err => {
                setError(err.message);
                if(err.message === 'no valid session' || err.message === 'action not permitted'){
                    setUserState({
                        isLoggedIn: false
                    });
                    setTheme('light');
                    setError('Login to access');
                }
            })
        }
        if(!todo){
            setError('Message cannot be Empty');
        }
    }

    const onInput = (e) =>{
        setTodo(e.target.value);
    }

    return (
        <div className="to-send">
            <input className="new-todo" value={ todo } onChange={ onInput } placeholder="Enter Task Name"/>
            <button className="add" onClick={ sendTodo }>Send</button>
        </div>

    );
};

export default AddToDo;