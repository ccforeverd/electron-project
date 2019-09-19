import React, { Component } from 'react'
// import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
// import i18n from './i18n'

class App extends Component {
  render () {
    // const { t } = useTranslation()

    return (
      <main>{i18n.t('hello world')}</main>
    )
  }
}

export default App
