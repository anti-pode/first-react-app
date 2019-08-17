import React from "react";
import './search-panel.css';

export default class SearchPanel extends React.Component {
    state = {
        input: '',
    };

    onSearch = ({ target }) => {
        this.setState({
            input: target.value,
        });

        this.props.onSearch(target.value);
    };

    render() {
        const { placeholder } = this.props;
        const { input } = this.state;

        return (
            <input type="text"
                   className="form-control search-input"
                   onChange={this.onSearch}
                   value={input}
                   placeholder={placeholder}/>
        );
    }
};