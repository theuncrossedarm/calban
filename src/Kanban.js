import React, { useReducer } from 'react';
import Column from './Column';
import ToolBar from './ToolBar';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const KANBAN_ACTIONS = {
    ADD_TASK: 'add-task',
    REORDER_TASKS: 'reorder-tasks'
}

function reducer(state, action) {
    switch (action.type) {
        case KANBAN_ACTIONS.ADD_TASK:
            return { ...state, columns: state.columns.map(column => {
                if (column.id === action.payload.columnId) {
                    return { ...column, tasks: [ ...column.tasks, newTask(action.payload.taskName) ]}
                }
                return column
            })}
        case KANBAN_ACTIONS.REORDER_TASKS:
            return { ...state, columns: state.columns.map(col => {
                if (col.id === action.payload.sourceCol.id) {
                    return action.payload.sourceCol
                }
                if (col.id === action.payload.destCol.id) {
                    return action.payload.destCol
                }
                return col
            })}
        default:
            return state
    }
}

function newTask(name) {
    return {id: uuidv4(), name: name, complete: false}
}

export default function Kanban() {
    const startingData = {
        columns: [
            {
                id: uuidv4(),
                name: "MONDAY",
                tasks: []
            },
            {
                id: uuidv4(),
                name: "TUESDAY",
                tasks: []
            },
            {
                id: uuidv4(),
                name: "WEDNESDAY",
                tasks: []
            },
            {
                id: uuidv4(),
                name: "THURSDAY",
                tasks: []
            },
            {
                id: uuidv4(),
                name: "FRIDAY",
                tasks: []
            }
        ]
    }

    const [state, dispatch] = useReducer(reducer, startingData)

    function handleDragEnd(result) {
        // Deconstruct the result object
        const { source, destination } = result;

        // Copy the column from which you're dragging
        const [sourceCol] = state.columns.filter(col => {
            return col.id === source.droppableId
        })

        const [destCol] = state.columns.filter(col => {
            return col.id === destination.droppableId
        })

        // Remove the dragged item from the source.
        const [removed] = sourceCol.tasks.splice(source.index, 1);

        // If the source and destination are the same, splice the item back into the source.
        if (source.droppableId === destination.droppableId) {
            sourceCol.tasks.splice(destination.index, 0, removed);
        // Otherwise, put it in the destination
        } else {
            destCol.tasks.splice(destination.index, 0, removed)
        }

        dispatch(
            {
                type: KANBAN_ACTIONS.REORDER_TASKS,
                payload: {
                    sourceCol: sourceCol,
                    destCol: destCol
                }
            }
        )        
    }

    return (
        <>
            <ToolBar />
            <DragDropContext onDragEnd={handleDragEnd}>
                {state.columns.map(col => <Column key={col.id} columnId={col.id} name={col.name} tasks={col.tasks} dispatch={dispatch} />)}
            </DragDropContext>
        </>
    )
}