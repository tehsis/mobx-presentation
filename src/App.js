import React, { Component } from 'react';
import './App.css';

class TodoList extends Component {
  render() {
    return <ul>
    { this.props.todos.map((todo, index) => <li>{todo}<button onClick={this.props.onTodoSelected(index)}>Done</button></li> )}
    </ul>
  }
}

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: ''
    };
  }

  handleNewTodo(ev) {
    const {value} = ev.currentTarget;
    this.setState((prev) => {
      prev.newTodo = value;
      return prev;
    })
  }

  todoReady(ev) {
    ev.preventDefault();
    this.props.onTodoReady(this.state.newTodo);
    this.setState({
      newTodo: ''
    });
  }

  render() {
    return <form onSubmit={this.todoReady}>
      <input type="text" onInput={this.handleNewTodo} value={this.state.newTodo} />
    </form>
  }
}

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

  handleNewTodo(todo) {
    this.setState((prev) => {
      prev.newTodo = todo;
      return prev;
    })
  }
  
  onTodoDone(id) {
      this.setState((prev) => {
        prev.todos.splice(id, 1);
        return prev;
      })
  }

  render() {
    return (
      <div>
        <h1>My Todo List</h1>
        <AddTodo onTodoReady={this.handleNewTodo} />
        <TodoList todos={this.state.todos} onTodoSelected={this.onTodoDone} />
      </div>
    );
  }
}

export default App;
