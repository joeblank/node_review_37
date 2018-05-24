import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      todos: [] 
    }
  }

  componentDidMount() {
    axios.get('/api/todos').then( res => {
      this.setState({
        todos: res.data
      })
    })
  }

  handleInput(val) {
    this.setState({
      userInput: val
    })
  }

  createTodo() {
    axios.post('/api/todos', {task: this.state.userInput}).then( res => {
      this.setState({
        todos: res.data,
        userInput: ''
      })
    })
  }

  deleteTask(id) {
    axios.delete(`/api/todos/${id}`).then(res => {
      this.setState({
        todos: res.data
      })
    })
  }

  render() {
    let todoList = this.state.todos.map( todo => {
      return (
        <div key={todo.id}>
          <p>Todo: {todo.task}</p>
          <p>Created: {todo.date}</p>
          <button onClick={() => this.deleteTask(todo.id)}>Delete</button>
          <hr />
        </div> 
      )
    })
    return (
      <div className="App">
        <h1>Todos</h1>
        <input 
          value={this.state.userInput}
          onChange={(e) => this.handleInput(e.target.value)} 
          placeholder='new todo'
        />
        <button onClick={() => this.createTodo()}>Add</button>
        <hr />

        {todoList}
      </div>
    );
  }
}

export default App;
