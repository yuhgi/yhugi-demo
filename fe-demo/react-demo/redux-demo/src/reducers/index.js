import {combineReducers} from 'redux';

import visibilityFilters from './visibilityFilters';
import todos  from './todos';

const todoApp = combineReducers({
    visibilityFilters,
    todos
});

export default todoApp;