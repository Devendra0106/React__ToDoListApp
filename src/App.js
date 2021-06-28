import './App.css';
import Table from './components/Table';
import AddTask from './components/AddTask';
import { useEffect, useState } from 'react';

const tasksArray = [
  {
    key: '123',
    currentState: 'Open',
    summary: "Buy Grocery",
    priority: 'High',
    createdOn: "2021-02-20",
    dueDate: "2021-07-01",
  },
  {
    key: '234',
    currentState: 'Close',
    summary: "Write Blog",
    priority: 'Low',
    createdOn: "2021-03-20",
    dueDate: "2021-07-02",
  },
  {
    key: '345',
    currentState: 'Open',
    summary: "Gym",
    priority: 'Medium',
    createdOn: "2021-04-20",
    dueDate: "2021-07-10",
  },
  {
    key: '456',
    currentState: 'Open',
    summary: "Assignments",
    priority: 'High',
    createdOn: "2021-05-20",
    dueDate: "2021-07-15",
  }
]

function App() {
  const [input, setInput] = useState('');
  const [tableData, setTableData] = useState(tasksArray);
  const [filteredData, setFilteredData] = useState(tasksArray);

  const addTaskHandler = (data) => {
    setTableData((prevTasks) => {
      return [data, ...prevTasks];
    });
    showAllTasks();
  }

  const onDelete = async (key) => {
    const data = await tableData.filter(item => item.key !== key);
    setTableData(data);
    setFilteredData(data);
    showAllTasks();
  }

  const onClose = async (key) => {
    const res = await tableData.find(item => item.key === key);
    const newRes = { ...res, currentState: 'Close' };
    const data = tableData.filter(item => item.key !== key);
    const newData = [...data, newRes];
    setTableData(newData);
    setFilteredData(newData);
  }

  const showAllTasks = async () => {
    setFilteredData(tableData);
  }

  const showOpenTasks = () => {
    const res = tableData.filter(item => item.currentState === 'Open')
    setFilteredData(res);
  }

  const showClosedTasks = () => {
    const res = tableData.filter(item => item.currentState === 'Close')
    setFilteredData(res);
  }

  const updateInput = async (event) => {
    const inp = event.target.value;
    const filtered = tableData.filter(task => {
      return task.summary.toString().toLowerCase().includes(inp.toString().toLowerCase())
    })
    setInput(input);
    setFilteredData(filtered);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="first-row">
          <h1>TODO App</h1>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Add task</button>
        </div>
        <div className="row">
          <div className="col-3 row-input">
            <label className="form-label">Group By</label>
            <select className="form-select">
              <option>None</option>
              <option>Priority</option>
              <option>Created On</option>
              <option>Pending On</option>
            </select>
          </div>
          <div className="col-9 rb-3">
            <label htmlFor="search" className="form-label">Search</label>
            <input type="text" id="search" className="form-control" input={input} onChange={updateInput} />
          </div>
        </div>
      </div>

      {/* replace with bootstrap navbar */}
      <div className="task-header">
        <span className="heading" onClick={showAllTasks}>All</span>
        <span className="heading" onClick={showOpenTasks}>Pending</span>
        <span className="heading" onClick={showClosedTasks}>Completed</span>
      </div>

      <Table tableData={filteredData} deleteTask={onDelete} closeTask={onClose} />
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add New Task</h5>
            </div>
            <div class="modal-body">
              <AddTask onAddTask={addTaskHandler} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
