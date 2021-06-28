import React, { useRef, useState } from 'react';

const AddTask = (props) => {
    const [currentState, setCurrentState] = useState('Open');

    const [titleInput, setTitleInput] = useState('');
    const [titleInputIsTouched, setTitleInputIsTouched] = useState(false);

    const [descriptionInput, setDescriptionInput] = useState('');
    const [descriptionInputIsTouched, setDescriptionInputIsTouched] = useState(false);

    const dueDateInput = useRef();
    const priorityInput = useRef();

    const eneteredTitleIsValid = titleInput.length > 10 && titleInput.length < 140;
    const titleIsInValid = !eneteredTitleIsValid && titleInputIsTouched;

    const eneteredDescriptionIsValid = descriptionInput.length > 10 && descriptionInput.length < 500;
    const descriptionIsInValid = !eneteredDescriptionIsValid && descriptionInputIsTouched;

    let formIsValid = false;
    if (eneteredTitleIsValid && eneteredDescriptionIsValid) {
        formIsValid = true
    }

    const titleInputHandler = (event) => {
        setTitleInput(event.target.value);
    }

    const titleBlurHandler = (event) => {
        setTitleInputIsTouched(true);
    }

    const descriptionInputHandler = (event) => {
        setDescriptionInput(event.target.value);
    }

    const descriptionBlurHandler = (event) => {
        setDescriptionInputIsTouched(true);
    }

    const SubmitHandler = (event) => {
        event.preventDefault();
        setTitleInputIsTouched(true);
        if (!eneteredTitleIsValid) {
            return;
        }
        const dueDate = dueDateInput.current.value;
        const priority = priorityInput.current.value;

        const date = new Date();
        const taskData = {
            key: date,
            currentState: currentState,
            summary: titleInput,
            createdOn: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            dueDate: dueDate,
            priority: priority
        }

        props.onAddTask(taskData);

        setTitleInput('');
        setTitleInputIsTouched(false);
        setDescriptionInput('');
        setDescriptionInputIsTouched(false);

        dueDateInput.current.value = '';
        priorityInput.current.value = '';
    }



    return (
        <React.Fragment>
            <form className="card p-2" >
                <div className="mb-3">
                    <label htmlFor="summary" className="form-label">Title</label>
                    <input type="text"
                        className="form-control"
                        id="summary"
                        value={titleInput}
                        onChange={titleInputHandler}
                        onBlur={titleBlurHandler} />
                    {titleIsInValid && <p>Input should be at least 10 char long</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description" rows="3"
                        onChange={descriptionInputHandler}
                        onBlur={descriptionBlurHandler} />
                    {descriptionIsInValid && <p>Description should be at least 10 char long</p>}
                </div>
                <div className="row">
                    <div className="col-6 mb-3">
                        <label className="form-label">Due Date</label>
                        <input type="date" className="form-control" min="2019-01-01" max="2023-12-31" ref={dueDateInput} />
                    </div>
                    <div className="col-6 row-input">
                        <label className="form-label">Priority</label>
                        <select className="form-select" ref={priorityInput}>
                            <option>None</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>
            </form>

            <div className="action">
                <button type="submit" className={formIsValid ? "btn btn-success" : "btn btn-secondary"} onClick={SubmitHandler}>Save</button>
            </div>
        </React.Fragment>
    )
}

export default AddTask;
