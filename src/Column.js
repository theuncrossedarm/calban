import React, { useState } from 'react';
import Task from './Task';
import './styles.css';
import TextInput from './TextInput';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Column({ columnId, name, tasks, dispatch }) {
    return (
        <div className="column">
            <div className="colHeader">{name}</div>
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => <Task key={task.id} taskId={task.id} taskIndex={index} name={task.name} />)}
                        {provided.placeholder}
                    </div>                    
                )}
            </Droppable>
            <TextInput columnId={columnId} dispatch={dispatch} />
        </div>
    )
}