import React from "react";
import './search-panel.css';

const SearchPanel = ({ placeholder }) => {
    return (
        <input type="text"
               className="form-control search-input"
               placeholder={placeholder} />
    );
};

export default SearchPanel;