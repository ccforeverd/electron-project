
import React from 'react'
import ReactDom from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

import './i18n'
// import 'typeface-roboto'

import App from './app'

const darkTheme = createMuiTheme({
  palette: {
    primary: green,
    type: 'dark'
  }
})

ReactDom.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
)
