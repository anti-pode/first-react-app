import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddForm from "../add-form";

import './app.css';

export default class App extends React.Component {
    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem("Go work"),
            this.createTodoItem("Build awesome app"),
            this.createTodoItem("Go home"),
        ],
        val: '',
        filter: 'active',  // active / done / all
    };

    createTodoItem(name) {
        return {
            name,
            important: false,
            done: false,
            id: this.maxId++,
        }
    };

    toggleProperty(arr, id, propName) {
        const currentIndex = arr.findIndex((item) => item.id === id );

        const oldItem = arr[currentIndex];
        const newItem = {...oldItem, [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, currentIndex),
            newItem,
            ...arr.slice(currentIndex + 1),
        ];
    }

    deleteListItem = (id) => {
        this.setState(({ todoData }) => {
            const currentIndex = todoData.findIndex((item) => item.id === id );
            const before = todoData.slice(0, currentIndex);
            const after = todoData.slice(currentIndex + 1);
            const newArray = [...before, ...after];

            return {
                todoData: newArray,
            };
        });
    };

    addListItem = (text) => {
        this.setState(({ todoData }) => {
            const newListItem = this.createTodoItem(text);

            const newArray = [...todoData, newListItem];

            return {
                todoData: newArray,
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done'),
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData} ) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important'),
            }
        });
    };

    onSearch = (val) => {
        this.setState({ val });
    };

    search = (items, val) => {
        if (!val.length) return items;

        return items.filter((item) => {
            return item.name
                .toLowerCase()
                .indexOf(val.toLowerCase()) > -1
        });
    };

    filter = (items, filter) => {
        switch (filter) {
            case "all": {
                return items;
            }
            case "active": {
                return items.filter((item) => {
                    return item.done === false;
                });
            }
            case "done": {
                return items.filter((item) => {
                    return item.done === true;
                });
            }
            default: {
                return items;
            }
        }
    };

    onTabClicked = (name) => {
        this.setState({ filter: name });
    };

    render() {
        const { todoData, val, filter } = this.state;

        const visibleItems = this.search(this.filter(todoData, filter), val);

        const doneCount = todoData
            .filter((item) =>  item.done)
            .length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader todo={todoCount} done={doneCount} />

                <div className="top-panel d-flex">
                    <SearchPanel
                        placeholder="Type to search"
                        onSearch={this.onSearch}/>
                    <ItemStatusFilter
                        filter={filter}
                        onTabClicked={this.onTabClicked}/>
                </div>

                <TodoList
                    todoData={visibleItems}
                    onDeleted={(id) => this.deleteListItem(id)}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <AddForm
                    onAdded={this.addListItem}
                />
            </div>
        );
    }
}