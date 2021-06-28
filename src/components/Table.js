import React from 'react';
import Task from './Task';

const Table = (props) => {

    const onDeleteTask = (key) => {
        props.deleteTask(key);
    }

    const onCloseTask = (key) => {
        props.closeTask(key);
    }

    const tableOutput = props.tableData.map(entry => (
        <Task entry={entry} onDeleteTask={onDeleteTask} onCloseTask={onCloseTask} />
    ))

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Summary</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Due By</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableOutput}
            </tbody>
        </table>
    )
}

export default Table;
