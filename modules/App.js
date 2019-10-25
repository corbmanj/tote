import React, {Component} from 'react'
import { AppProvider, AppConsumer, AppContext } from './AppState'
import Main from './Main'

export default class App extends Component {

  render() {
    return (
      <AppProvider>
        <AppConsumer>
        {() => (
          <Main />
        )}
        </AppConsumer>
      </AppProvider>
    )
  }
}

App.contextType = AppContext;
