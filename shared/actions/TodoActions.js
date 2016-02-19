import request from 'axios';

const API_URL = 'http://localhost:3000/data';

export function getTodos() {
  return {
    type:    'GET_TODOS',
    promise: request.get(API_URL+'/getallnotes')
  }
}

export function getUsersTodos() {
  return {
    type:    'GET_USERS_TODOS',
    promise: request.post(API_URL+'/getusersnotes')
  }
}

export function createTodo(text, expire_time) {
  return {
    type:    'CREATE_TODO',
    promise: request.post(API_URL+'/createnote', {text: text, expire_time: expire_time})
  };
}

export function editTodo(id,_id, text, color) {
  return {
    type: 'EDIT_TODO',
    promise: request.post(API_URL+'/editnote',{id: id, _id: _id, text: text, color: color})
  };
}

export function deleteTodo(id,_id) {
  return {
    type: 'DELETE_TODO',
    promise: request.post(API_URL+'/deletenote', {id: id, _id: _id})
  };
}
export function logInUser(data:Object):Function {
  return dispatch => {
    console.log("Tst")
    setTimeout(_ => dispatch({
      type: 'LOG_IN',
      ok: true,
      data: {
        username: "user",
        email: "user@test.com"
      }
    }), 1000)
  };
}
export  function clearStoreList(){
  return{
    type: 'CLEAR_STORE'
  }
}
export function logInUser(data:Object):Function {
  return dispatch => {
    console.log("Tst");
    console.log(data.name, 'NAME');
    request.post('http://localhost:3000/autoriz/login', {username: data.name, password: data.password})
        .then(response => {
          console.log(response, "RESPONSE FROM SERVER");
          if(response.data) {
            dispatch({...response, type: 'LOG_IN'})
          }
          else {
            dispatch({type: 'INCORRECT_INPUT'})
          }
        })
  };
}
export function registerUser(data:Object):Function {
  return dispatch => {
    console.log("Tst@");
    request
        .post('http://localhost:3000/autoriz/register', {username: data.name, password: data.password})
        .then(response => {
          if (response.data.success) {
            dispatch({ type: 'REGISTER'})
          } else {
            dispatch({ type: 'INCORRECT_INPUT'})
          }
        })
  };
}

export function logOutUser(){
  return{
    type: 'LOG_OUT'
  };
}
export function getAllUsers(){
  return{
    type: 'GET_ALL_USERS',
    promise: request.post(API_URL+'/getallusers')
  }
}
export function addNoteToUser(id_user, _id_user,_id_note){
  return{
    type: 'ADD_NOTE_TO_USER',
    promise: request.post(API_URL+'/addusertonote',{id_user: id_user, _id_user: _id_user, _id_note: _id_note })
  }
}