import React, { useState } from 'react';
import {fetchTask, fetchUpdateTask, fetchAllTodos, deleteTask} from './services';
import Filter from './Filter'


const TodoDisplay = ({todos,  userState , setTodos, setError, setUserState, setTheme}) =>{
    const [newtodo, setTodo] = useState('');
    const [filterState, setFilterState] = useState('All');
    const [sortState, setSortState] = useState('');

    const changeStatus = (e) => {
        const id = e.target.dataset.id;
        fetchTask(id, userState.username)
        .then( task  => {
            task.data.done = !task.data.done;
            const todo = {...task.data}
            fetchUpdateTask(userState.username, todo)
            .then( () =>{
                fetchAllTodos(userState.username)
                .then( tasks => {
                    setTodos(Object.values(tasks.data));
                })
            })
        })
        .catch( err => {
            setError(err.message);
            if(err.message =='no valid session' || err.message == 'action not permitted'){
                setUserState({
                    isLoggedIn: false
                });
                setTheme('light');
                setError('Login to access');
            }
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
        .catch( err => {
            setError(err.message);
            if(err.message =='no valid session' || err.message == 'action not permitted'){
                setUserState({
                    isLoggedIn: false
                });
                setTheme('light');
                setError('Login to access');
            }
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
        .catch( err => {
            setError(err.message);
            if(err.message =='no valid session' || err.message == 'action not permitted'){
                setUserState({
                    isLoggedIn: false
                });
                setTheme('light');
                setError('Login to access');
            }
        })
    }

    const filtered = (filter) =>{
        setFilterState(filter);
    }

    const sorted = (sort) => {
        setSortState(sort);
    }
    
    function isFiltered(task){
        if(filterState === 'Done'){
            return task.done == true;
        }else if(filterState === 'Not Done'){
            return task.done == false;
        }else{
            return true;
        }
    }

    function isSorted(task1, task2){
        if(!sortState){
            return;
        }
        if(sortState === 'Sort Ascending Name'){
            return task1.task.localeCompare(task2.task);
        }
        if(sortState === 'Sort Descending Name'){
            return task2.task.localeCompare(task1.task);
        }
        if(sortState === 'Sort By Done'){
            return task2.done - task1.done;
        }
        if(sortState === 'Sort By Not Done'){
            return task1.done - task2.done;
        }
    }

    const todosList = [...todos]
    .sort(isSorted)
    .filter(isFiltered).map( (todo) =>
        <li key={todo.taskId}>
        <div className="task-info">
            <div className="done">
                <button className="done" data-id={todo.taskId} onClick={changeStatus}>{todo.done ? 'Done' : 'Not Done'}</button>
            </div>
            <div className="container">
                <input className= "newTask" onChange={ update } defaultValue={todo.task}/>
                <button className="update" data-id={todo.taskId} onClick={updateText}>Update</button>
            </div>
          <button className="delete" data-id={todo.taskId} onClick={deleteText}>Delete</button>
        </div>
        </li>
    );

    return (
        <div className="todo-content">
            <Filter onFilter={filtered} onSort={sorted}></Filter>
            <ul className="todos">{ todosList }</ul>
        </div>
    )

}

export default TodoDisplay;