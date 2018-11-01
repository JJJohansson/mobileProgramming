import React, { Component } from 'react';
import logo from './list.png';
import './App.css';
import TodoTable from './TodoTable'
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      date: '',
      todos: [{date: '25.07.1991', description: 'Get born son!'},
              {date: '28.08.2018', description: 'Finish this god damn assignment'},
              {date: '24.12.YYYY', description: 'Open up those presents!'},
              {date: '31.12.YYYY', description: 'Shoot up some rockets!'},
              {date: '01.05.YYYY', description: '404 - Memory not found'}]
    }
  }

  inputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  addTodo = (event) => {
    event.preventDefault();
    const todo = {};
    todo.date = this.state.date;
    todo.description = this.state.description;
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  removeTodo = (event) => {
    const id = parseInt(event.target.id);
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== id)
    });
  }

  render() {
    return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Things to do..</h1>
         </header>
         <div id="todos">
            <fieldset>
               <legend>Add todo:</legend>
               <form onSubmit={this.addTodo}>
                  Description: <input type="text" name="description" size="20" onChange={this.inputChange} />
                  Date: <input type="text" name="date" size="20" onChange={this.inputChange} />
                  <input type="submit" value="Add" />
               </form>
            </fieldset>
            <TodoTable todos={this.state.todos} removeTodo={this.removeTodo} />
         </div>
      </div>
    );
  }
}

export default App;
