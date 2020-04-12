import React, { useState } from 'react';
import {fetchTask, fetchUpdateTask, fetchAllTodos, deleteTask} from './services';


const TodoDisplay = ({todos,  userState , setTodos}) =>{
    const [newtodo, setTodo] = useState('');

    const changeStatus = (e) => {
        const id = e.target.dataset.id;
        fetchTask(id, userState.username)
        .then( task  => {
            task.data.status = !task.data.status;
            const todo = {...task.data}
            fetchUpdateTask(userState.username, todo)
            .then( () =>{
                fetchAllTodos(userState.username)
                .then( tasks => {
                    setTodos(Object.values(tasks.data));
                })
            })
        })
    }

    const updateText = (e) => {
        const id = e.target.dataset.id;
        const text = newtodo;
        fetchTask(id, userState.username)
        .then( task  => {
            const tasks = task.data
            const updated = {...tasks, task:text}
            fetchUpdateTask(userState.username, updated)
            .then( () => {
                fetchAllTodos(userState.username)
                .then( tasks => {
                    setTodos(Object.values(tasks.data));
                })
            })
        })
    }
    const update = (e) => {
        setTodo(e.target.value);
    }

    const deleteText =  (e) => {
        const id = e.target.dataset.id;
        deleteTask(userState.username, id)
        .then( () => {
            fetchAllTodos(userState.username)
            .then( tasks => {
                setTodos(Object.values(tasks.data));
            })
        })

    }


    const todosList = Object.values(todos).map( (todo) =>
        <li key={todo.taskId}>
        <div className="task-info">
          <button className="done" data-id={todo.taskId} onClick={changeStatus}>{todo.status ? 'Complete' : 'Not Complete'}</button>
          {/* <span className="task">{todo.task}</span> */}
          <input className= "newTask" onChange={ update } defaultValue={todo.task}/>
          <button className="update" data-id={todo.taskId} onClick={updateText}>Update</button>
          <button className="delete" data-id={todo.taskId} onClick={deleteText}>Delete</button>
          
        </div>
        </li>
    );

    return (
        <div className="todo-content">
            <ul className="todos">{ todosList }</ul>
        </div>
    )

}

export default TodoDisplay;