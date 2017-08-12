import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'

const element = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
)

render(element, document.getElementById('app'))
