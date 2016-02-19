import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_USERS_TODOS':
      return new Immutable.List(action.res.data);
    case 'GET_TODOS':
          return state;
    case 'CREATE_TODO':
      return state.concat(action.res.data);
    case 'EDIT_TODO':
        console.log(action.res.data, 'DATA FROM REDUCER!!!!$@@@@@');
      return state.set(action.res.data.id, action.res.data.note);
    case 'DELETE_TODO':
      return state.delete(action.res.data.id)
    case 'CLEAR_STORE':
          state;
    default:
      return state;
  }
}
