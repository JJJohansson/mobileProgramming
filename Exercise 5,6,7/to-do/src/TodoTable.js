import React, { Component } from 'react';
import './App.css';

class TodoTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const todo = this.props.todos.map((todo, index) =>
      <tr key={index}>
        <td>{todo.date}</td>
        <td>{todo.description}</td>
        <td>
          <button onClick={this.props.removeTodo} id={index}>Delete</button>
        </td>
      </tr>
    )

    return (
      <div>
        <table>
           <thead>
              <tr>
                 <th><strong>Date</strong></th>
                 <th><strong>Description</strong></th>
              </tr>
           </thead>
           <tbody>
             {todo}
           </tbody>
        </table>
      </div>
    );
  }
}

export default TodoTable;
