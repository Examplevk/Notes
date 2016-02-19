import React                from 'react';
import { render }           from 'react-dom';
import { Router , browserHistory}           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux';
import reducers             from 'reducers';
import routes               from 'routes';
import thunk                from 'redux-thunk'
import promiseMiddleware    from 'lib/promiseMiddleware';
import immutifyState        from 'lib/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware }  from 'redux';

import { routeActions,syncHistory, routeReducer } from 'react-router-redux'

const initialState = immutifyState(window.__INITIAL_STATE__);

const reducer = combineReducers(Object.assign({}, reducers, {
   routing: routeReducer
}))
const history = createBrowserHistory();
const reduxRouterMiddleware = syncHistory(history)
//const reduxRouterMiddleware = syncHistory(history)

//const testMiddleware = ({getState}) => next => action => {
//    let state = getState()
//    if(state.authenticated) {
//        console.log("UPD:", state)
//        alert("Authenticated!");
//        store.dispatch(routeActions.push('/notes'))
//    }
//    return next(action)
//}

export const store   = applyMiddleware(thunk, promiseMiddleware, reduxRouterMiddleware)(createStore)(reducer, initialState);

//reduxRouterMiddleware.listenForReplays(store)

window.redirect = _ => store.dispatch(routeActions.push('/notes'))
render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
