import React from "react";
import './todo-list-item.css'

const TodoListItem = (props) => {
    const { name, onDeleted, onToggleDone, onToggleImportant, done, important  } = props;

    let ClassName = "todo-list-item";
    if (done) ClassName += " done";
    if (important) ClassName += " important";

    return (
        <span className={ClassName}>
            <span
                className="todo-list-item-label"
                onClick={onToggleDone}>
                {name}
            </span>

            <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
                <i className="fa fa-exclamation" />
            </button>

            <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
                <i className="fas fa-trash" />
            </button>
        </span>
    );
};

export default TodoListItem;