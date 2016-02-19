import React, { PropTypes } from 'react';

export default class TodosForm extends React.Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired
  };
  constructor(...v){
    super(...v)

    this.state = {
      visible: false
    }
    this.changeVisibility = this.changeVisibility.bind(this)
  }
  handleSubmit = () => {
    let node = this.refs['todo-input'];
    let expire_time = this.refs['expire-input'];

    this.props.createTodo(node.value, expire_time.value);

    expire_time.value = '';
    node.value = '';

  };
  changeVisibility(v){
    this.setState({
      visible: v
    })
  }
  render() {
    return (
      <div className="inputForm col-xs-4 col-xs-offset-4">
        <div className="col-xs-4 col-xs-offset-4">
          <div onClick={() => {this.changeVisibility(true)}}><textarea ref="todo-input" cols="34" rows="3" placeholder="Add note"></textarea></div>
          <div className={(this.state.visible) ? '' : 'hidden'}>
            <input type="date" placeholder="expire time" ref="expire-input"/>
            <input type="submit" className="btn btn-default inputButton" value="OK!" onClick={this.handleSubmit} />
            <input type="submit" className="btn btn-default inputButton" value="Cancel" onClick={()=>{this.changeVisibility(false)}}/>
          </div>
        </div>
      </div>
    );
  }
}
