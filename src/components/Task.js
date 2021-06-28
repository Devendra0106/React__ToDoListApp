import React, { useState } from 'react';

const Task = (props) => {
    const entry = props.entry;
    const closeTaskHandler = () => {
        props.onCloseTask(entry.key);
    }

    const deleteTaskHandler = () => {
        props.onDeleteTask(entry.key);
    }

    const actionButtons = (<div>
        <button className="btn btn-primary me-2">Edit</button>
        <button className="btn btn-success me-2" onClick={closeTaskHandler}>Done</button>
        <button className="btn btn-danger" onClick={deleteTaskHandler}>Delete</button>
    </div>)

    return (
        <tr>
            <td>{entry.summary}</td>
            <td>{entry.priority}</td>
            <td>{entry.createdOn}</td>
            <td>{entry.dueDate}</td>
            <td>{actionButtons}</td>
        </tr>
    )
}

export default Task;
