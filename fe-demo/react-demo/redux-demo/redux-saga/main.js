import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

import rootSaga from './sagas';

import Counter from './Counter'
import Fetch from './Fetch';
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();


const store = createStore(
  reducer,
  applyMiddleware(
    sagaMiddleware,
    loggerMiddleware
  )
)

sagaMiddleware.run(rootSaga);

const action = (type,payload) => store.dispatch({type,payload})

const App = () => (
  <div>
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
    />
    <Fetch
      onFetchAsync={() => action('FETCH_REQUEST',{url:'test/url'})}
      onLogin={() => action('LOGIN_REQUEST',{user:'a',password:'123'})}
      onLogout={() => action('LOGOUT')}
    />
  </div>
)

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
