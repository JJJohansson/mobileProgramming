import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', todos: []}
  }

  inputChanged = (event) => {
    this.setState({description: event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState({
      todos: [...this.state.todos, this.state.description]
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            <input type="text" onChange={this.inputChanged} value={this.state.description}/>
            <input type="submit" value="Add"/>
          </form>
        </div>
        <div>
          <ul>
            {this.state.todos.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
