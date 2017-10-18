import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import {addTodo,toggleTodo,setVisibilityFilter,VisibilityFilters} from './actions';
import todoApp from './reducers';

let store = createStore(todoApp);

console.log(store.getState());

let unsubcribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

import App from './components/App';

ReactDOM.render(<App />,document.getElementById('react-app'));