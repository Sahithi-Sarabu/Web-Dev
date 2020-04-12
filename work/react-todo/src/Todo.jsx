import React, {useState, useEffect, useContext} from 'react';
import AddToDo from './AddToDo';
import TodoDisplay from './TodoDisplay'
import {fetchAllTodos, fetchTheme, updateTheme } from './services';
import Logout from './Logout';
import ThemeContext from './ThemeContext';

const Todo = ({ userState, setUserState, setError }) => {
    const [todos, setTodos] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    const getTodos = () =>{
        fetchAllTodos(userState.username)
        .then( TodoList =>{
            setTodos(Object.values(TodoList.data));
        })
        .catch( err =>{
            setError(err.message);
        });
    };

    const getTheme = () => {
        fetchTheme(userState.username)
        .then( userInfo =>{
            const selected = userInfo.data.theme;
            if(selected == 'light' || selected == 'dark'){
                setTheme(selected);
            }else{
                setTheme('colorful');
            }
        })
        .catch( err =>{
            setError(err.message);
        });
    }

    const logout = ()=>{
        setUserState({
            isLoggedIn: false
        });
    };

    useEffect( () => {
        getTodos();
        setError('');
        getTheme();
    }, []);

    const send = ( todosList) =>{
        setTodos(Object.values(todosList));
    }

    const changeTheme = (e) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
        updateTheme(userState.username, newTheme)
        .catch( err =>{
            setError(err.message);
        });
    }

    return (
        <div className="todo">
            <h2>To be Done</h2>
            <Logout onLogout={ logout } setError={ setError }/>
            <select className="themes" onChange={changeTheme}>
                <option>colorful</option>
                <option>light</option>
                <option>dark</option>
            </select>
            <AddToDo onSend={ send } userState={userState} setUserState= {setUserState} setError= {setError}/>
            <TodoDisplay todos={ todos } userState={userState} setTodos={setTodos}/> 
        </div>
    );
};

export default Todo;