import React         from 'react';
import { PropTypes } from 'react';
import Immutable     from 'immutable';
import Todo from './Todo';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import _ from 'lodash'


export default class TodosView extends React.Component {
  static propTypes = {
    todos:      PropTypes.instanceOf(Immutable.List).isRequired,
  };


  render() {
    let parentNumber = 0;
    let parent;

    const {todos, shared} = this.props;
    let columns =  [[], [], [], [], [], []];

    let iter = 0;
    todos.map((todo, index)=>{
        columns[iter].push({todo: todo, index: index});
        ++iter;
        if(iter == 6) iter = 0;
    })

    console.log("Colums => ", columns)
    return (
        <div className="column-grid">
          {columns.map((col, indexCol) => (
              <div key={indexCol} className="col col-offset">
                {col.map((todo, index) => <Todo key={todo.todo._id} index={todo.index} todo={todo.todo} addNoteToUser={this.props.addNoteToUser} eidtTodo={this.props.editTodo} deleteTodo={this.props.deleteTodo} shared={shared}/>)}
              </div>
          ))}
        </div>
    );
  }
}
