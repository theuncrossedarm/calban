import React, { useState } from 'react';
import './styles.css';
import { KANBAN_ACTIONS } from './Kanban';

export default function TextInput( {columnId, dispatch} ) {
    const [inputValue, setInputValue] = useState('');

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch({ type:  KANBAN_ACTIONS.ADD_TASK, payload: { columnId: columnId, taskName: inputValue }})
        setInputValue('')
    }

    return (
        <form className="task" onSubmit={handleSubmit}>
            <input className="textInput" type="text" value={inputValue} onChange={handleChange}></input>
        </form>   
    )
}