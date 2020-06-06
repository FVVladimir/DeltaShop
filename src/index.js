import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk' // для исинхронности action
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom' // для сайта расположеного на статическом сервере (github pages)
import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router' // СonnectedRouter
import { composeWithDevTools } from 'redux-devtools-extension' // дэбаг приложения

import createRootReducer from 'reducers'
import routes from 'routes'

const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)] // функции вызываемые между actions & reducers
const store = createStore( 
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      {routes}
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

// Provider - компонент позволяющий использовать Redux внутри React
// Layout - компонент в котором находится содержимое приложения