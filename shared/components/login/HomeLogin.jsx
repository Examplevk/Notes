import React, { Component , PropTypes }   from 'react';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import {logInUser} from './../../actions/TodoActions'
import { routeActions } from 'react-router-redux'

class HomeLogin extends Component {
    constructor(...opions) {
        super(...opions)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.registerSubmit = this.registerSubmit.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        console.log(newProps.authenticated[1])
        if (newProps.authenticated[0]) {
            let boundActionCreators = bindActionCreators(TodoActions, this.props.dispatch);
            boundActionCreators.getUsersTodos();
            this.props.dispatch(routeActions.push('/notes'));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        let boundActionCreators = bindActionCreators(TodoActions, dispatch);

        let name = this.refs['name-input'];
        let password = this.refs['password-input'];


        let {authenticated , todos} = this.props;

        dispatch(logInUser({name: name.value, password: password.value}));

        this.refs['name-input'].value = '';
        this.refs['password-input'].value = '';

        }
    registerSubmit(e){
        e.preventDefault();
        const { dispatch } = this.props;
        let boundActionCreators = bindActionCreators(TodoActions, dispatch);

        let name = this.refs['name-input'];
        let password = this.refs['password-input'];

        dispatch(TodoActions.registerUser({name: name.value, password: password.value}));

        this.refs['name-input'].value = '';
        this.refs['password-input'].value = '';

    }

    render() {

        return (
            <div id="Login-panel" className=" col-xs-4 col-xs-offset-4">
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">User name</label>
                        <input type="text" ref="name-input" name="username" className="form-control" id="exampleInputName" placeholder="User name"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" ref="password-input" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className={(this.props.authenticated[1]) ? "invalid-login" : "hidden"}>Incorrect password or login</div>
                    <div className={(this.props.authenticated[2]) ? "register-success" : "hidden"}>Register success, please, log in</div>
                    <button className="btn btn-default btn-login" onClick={this.handleSubmit}>Log in</button>
                    <button className={(!this.props.authenticated[2]) ? "btn btn-default btn-login" : "hidden"} onClick={this.registerSubmit}>Register</button>
                </form>
            </div>
        );
    }
}
export default connect(state => ({ todos: state.todos , authenticated: state.authenticated}))(HomeLogin)