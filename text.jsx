-import React         from 'react';
-import { PropTypes } from 'react';
-import Immutable     from 'immutable';
-import Todo from './Todo';
-import { bindActionCreators } from 'redux';
-import * as TodoActions       from 'actions/TodoActions';
-import _ from 'lodash'
-
    -
        -export default class TodosView extends React.Component {
-  static propTypes = {
        -    todos:      PropTypes.instanceOf(Immutable.List).isRequired,
-  };
-
    -
        -  render() {
    -    let parentNumber = 0;
    -    let parent;
    -
        -    let todos = this.props.todos;
    -    let columns =  [[], [], [], [], [], []];
    -
        -    columns.map((col, indexCol) => {
            -      return (
                -          <div>
                    -            {col.map((todo, index) => <Todo todo={todo} />)}
                    -          </div>
                -      )
                -    });
    -
        -    console.log("=>", todos)
    -    return (
    -      <div id="todos-list" className="clear-fix">
        -        <div id="col-1" className="col clear-fix"></div>
        -        <div id="col-2" className="col clear-fix"></div>
        -        <div id="col-3" className="col clear-fix"></div>
        -        <div id="col-4" className="col clear-fix"></div>
        -        <div id="col-5" className="col clear-fix"></div>
        -        <div id="col-6" className="col clear-fix"></div>
        -        {
        -          this.props.todos.map(function (todo, index) {
            -          console.log(this.props.todos.size, "Size of list!!!");
            -            ++parentNumber;
            -            if(parentNumber == 7) parentNumber = 1;
            -
                -            switch (parentNumber){
                -              case 1:
                    -                parent = "col-1";
                    -                break;
                    -              case 2:
                    -                parent = "col-2";
                    -                break;
                    -              case 3:
                    -                parent = "col-3";
                    -                break;
                    -              case 4:
                    -                parent = "col-4";
                    -                break;
                    -              case 5:
                    -                parent = "col-5";
                    -                break;
                    -              case 6:
                    -                parent = "col-6";
                    -                break;
                    -            }
            -            return(<Todo key={todo._id} index={index} todo={todo} eidtTodo={this.props.editTodo} deleteTodo={this.props.deleteTodo} parent={parent}/>);
            -          }.bind(this))
        -        }
        -      </div>
    -    );
    -  }
-}