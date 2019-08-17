import React from "react";
import './add-form.css';

export default class AddForm extends React.Component {
    state = {
        input: '',
    };

    onInputChanged = (e) => {
        this.setState({
            input: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdded(this.state.input);

        this.setState({
            input: '',
        });
    };

    render() {
        return (
            <form
                className="add-form d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    onChange={this.onInputChanged}
                    placeholder="What needs to be done"
                    value={this.state.input}/>
                <button
                    className="btn btn-outline-secondary add-btn">
                    Add new task
                </button>
            </form>
        );
    }
}