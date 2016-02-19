
const defaultState = [false, false, false]; //flags for log in

export default function authenticatedReducer(state = defaultState, action) {

    switch(action.type) {
        case 'LOG_IN':
            if(action.data)
                return [true, false, false];
            else
                return [false, false, false];
        case 'INCORRECT_INPUT':
            return [false, true, false];
        case 'LOG_OUT':
            return [false, false, false];
        case 'REGISTER':
            return [false, false, true];
        default:
            return state;
    }
}
