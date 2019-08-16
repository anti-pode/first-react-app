import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddButton from "../add-button";

import './app.css';

export default class App extends React.Component {
    maxId = 1;

    state = {
        name: 'lox',
        placeholder: 'Type to search',
        todoData: [
            this.createTodoItem("Go work"),
            this.createTodoItem("Build awesome app"),
            this.createTodoItem("Go home"),
        ],
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

    addListItem = () => {
        this.setState(({ todoData }) => {
            const newListItem = this.createTodoItem("New item");

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

    render() {
        const {todoData, placeholder} = this.state;

        const doneCount = this.state.todoData
            .filter((item) =>  item.done)
            .length;

        const todoCount = this.state.todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader todo={todoCount} done={doneCount} />

                <div className="top-panel d-flex">
                    <SearchPanel placeholder={placeholder}/>
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todoData={todoData}
                    onDeleted={(id) => this.deleteListItem(id)}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <AddButton
                    onAdded={this.addListItem}
                />
            </div>
        );
    }
}