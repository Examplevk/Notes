import React, { Component , PropTypes }   from 'react';
import TodosView              from './TodosView';
import TodosForm              from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';
import { routeActions } from 'react-router-redux';

class Home extends Component {
  static propTypes = {
    todos:    PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(...opions) {
    super(...opions)


    console.log(this.props.todos.size, 'Size');
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit() {
    const { todos, dispatch } = this.props;
    dispatch(TodoActions.logOutUser());
    dispatch(TodoActions.clearStoreList());
  };

  componentWillMount () {

    this.props.dispatch(TodoActions.getUsersTodos())
    this.props.dispatch(TodoActions.getAllUsers())
  }

  render() {

    const { todos, dispatch, shared } = this.props;
    console.log('SHARED =>',this.props.shared)

    return (

      <div id="todo-list">
        <div className="logout"><a href="http://localhost:3000/autoriz/logout" onClick={() => {this.handleSubmit()}}>Log out</a></div>
        <TodosForm
            {...bindActionCreators(TodoActions, dispatch)}/>
        <TodosView todos={todos} shared={shared}
          {...bindActionCreators(TodoActions, dispatch)} />
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos, shared: state.shared }))(Home)
