import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function sharedReducer(state = defaultState, action){
    switch (action.type){
        case 'GET_ALL_USERS':
            console.log(action.res.data, 'ARRAY FROM REDUCER');
            return new Immutable.List(action.res.data);
        case 'ADD_NOTE_TO_USER':
            state.get(action.res.data.id).shared_notes_id.push(action.res.data.note_id);
            console.log(state, "STATE FROM REDUCER ADD_NOTE_TO_USER");
            return state;
        default:
            return state;
    }
}
