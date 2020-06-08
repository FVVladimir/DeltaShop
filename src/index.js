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
import Container from '@material-ui/core/Container'
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
    <Container maxWidth='xl' style={{padding: 0, width: '100vw', height: '100vh'}}>
      <Grid container direction="row" justify="center" alignItems="center" style={{height: '100%', backgroundColor: brown[100]}}>
        <Provider store={store}>
          <HashRouter history={history}>
            {routes}
          </HashRouter>
        </Provider>
      </Grid>
    </Container>
  </React.Fragment>
  ,
  document.getElementById('root')
)

// Provider - компонент позволяющий использовать Redux внутри React
// Layout - компонент в котором находится содержимое приложения