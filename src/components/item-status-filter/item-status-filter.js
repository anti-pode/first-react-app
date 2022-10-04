import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
    buttons = [
        {name: 'All', active: true, id: 245},
        {name: 'Active', active: false, id: 453453},
        {name: 'Done', active: false, id: 864},
    ];

    render() {
        const { filter, onTabClicked } = this.props;
    
        console.log(123)

        const buttons = this.buttons.map((item) => {
            const isActive = filter === item.name.toLowerCase();

            let className = 'btn ';
            className +=
                isActive ?
                    'btn-info' :
                    'btn-outline-secondary';

            return (
                <button
                    type="button"
                    className={className}
                    key={item.id}
                    onClick={() => onTabClicked(item.name.toLowerCase())}>{item.name}</button>
            );
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
};
