import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './modules/App'

const element = (
  <App/>
)

render(element, document.getElementById('app'))
