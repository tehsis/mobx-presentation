import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      todos: []
    }
    this.todoReady = this.todoReady.bind(this);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.onTodoDone = this.onTodoDone.bind(this);
  }

  todoReady(ev) {
    ev.preventDefault();
    this.setState((prev) => {
      prev.todos.push(prev.newTodo);
      prev.newTodo = '';
      return prev;
    })
  }

  handleNewTodo(ev) {
    const {value} = ev.currentTarget;
    this.setState((prev) => {
      prev.newTodo = value;
      return prev;
    })
  }
  
  onTodoDone(id) {
    return (ev) => {
      this.setState((prev) => {
        prev.todos.splice(id, 1);
        return prev;
      })
    }
  }

  render() {
    return (
      <div>
        <h1>My Todo List</h1>
        <form onSubmit={this.todoReady}>
        <input type="text" onInput={this.handleNewTodo} value={this.state.newTodo} />
        </form>

        <ul>
          {this.state.todos.map((todo, index) => <li>{todo}<button onClick={this.onTodoDone(index)}>Done</button></li> )}
        </ul>
      </div>
    );
  }
}

export default App;
