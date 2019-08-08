
import React from 'react'
import ReactDom from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import App from './app'
import store from './store'

configure({
  enforceActions: 'observed' // 开启严格模式
})

ReactDom.render(
  <Provider { ...store }>
    <App />
  </Provider>,
  document.getElementById('app')
)
