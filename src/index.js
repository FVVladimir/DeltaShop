import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk' // для исинхронности action
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom' // для сайта расположеного на статическом сервере (github pages)
import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router' // СonnectedRouter
import { composeWithDevTools } from 'redux-devtools-extension' // дэбаг приложения

import routes from 'routes'
import createRootReducer from 'reducers'

import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import { brown } from '@material-ui/core/colors'

const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)] // функции вызываемые между actions & reducers
const store = createStore( 
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
)

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%', height: '100vh', backgroundColor: brown[100]}}>
        <Provider store={store}>
          <HashRouter history={history}>
            {routes}
          </HashRouter>
        </Provider>
      </Grid>
  </React.Fragment>
  ,
  document.getElementById('root')
)

// Provider - компонент позволяющий использовать Redux внутри React
// Layout - компонент в котором находится содержимое приложения