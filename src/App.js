import "./App.css";
import React, { Component } from "react";
import { v4 } from "uuid";
import TodoItem from "./components/todoItem";

class App extends Component {
  state = {
    todos: [
      { id: v4(), title: "Some todo item", checked: true },
      { id: v4(), title: "Some todo item2", checked: false },
    ],
    newTodoText: "",
  };

  constructor() {
    super();
    const data = localStorage.getItem("todo_app_data");
    if (data) this.state = JSON.parse(data);
  }

  saveAppState() {
    let state = { ...this.state };
    const data = JSON.stringify(state);
    localStorage.setItem("todo_app_data", data);
  }

  componentDidUpdate = () => {
    this.saveAppState();
  };

  handleOnChecked = (evt, id) => {
    const todos = this.state.todos.map((t) => {
      if (t.id === id) {
        t.checked = evt.target.checked;
      }
      return t;
    });
    this.setState({ todos });
  };

  handleOnDelete = (id) => {
    const todos = this.state.todos.filter((t) => t.id !== id);
    this.setState({ todos });
  };

  handleOnAddNewTodo = () => {
    if (this.state.newTodoText !== "") {
      const todos = [...this.state.todos];
      todos.push({ id: v4(), title: this.state.newTodoText, checked: false });
      this.setState({ todos });
      this.setState({ newTodoText: "" });
    }
  };

  handleOnNewTodoTextChanged = (evt) => {
    const newTodoText = evt.target.value;
    this.setState({ newTodoText });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-head bg-dark text-light p-3">
            <h1>Todo</h1>
          </div>
          <div className="card-body">
            <div className="list-group">
              {this.state.todos.map((t) => {
                return (
                  <TodoItem
                    todoItem={t}
                    onChecked={this.handleOnChecked}
                    onDelete={this.handleOnDelete}
                  />
                );
              })}
              <label className="list-group-item d-flex gap-3">
                <input
                  type="text"
                  placeholder="Add a new todo item"
                  className="form-control"
                  value={this.state.newTodoText}
                  onChange={(e) => this.handleOnNewTodoTextChanged(e)}
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => this.handleOnAddNewTodo()}
                >
                  Add
                </button>
              </label>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
