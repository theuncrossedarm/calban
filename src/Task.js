import React from 'react';
import './styles.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Task({ taskId, taskIndex, name }) {
    return (
        <Draggable draggableId={taskId} index={taskIndex}>
            { (provided, snapshot) => (
                <div  
                    className="task"
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                >
                    {name}
                </div>
            )}
        </Draggable>
        
    )
}