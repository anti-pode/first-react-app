import React from "react";
import './add-button.css';

export default class AddButton extends React.Component {
    render() {
        const { onAdded } = this.props;

        return (
            <button
                className="btn btn-outline-secondary add-btn"
                onClick={onAdded}>
                Add new task
            </button>
        );
    }
}