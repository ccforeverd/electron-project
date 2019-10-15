import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ViewEntrance from '@/goverment/views/Entrance'
import ViewLoading from '@/goverment/views/Loading'
import ViewMain from '@/goverment/views/Main'

@inject('data')
@inject('view')
@observer
class App extends Component {
  componentDidMount () {
    const data = this.props.data.load()

    console.log('data', data)

    if (data) {
      this.props.data.setData(data)
      this.props.view.gotoMain()
    } else {
      this.props.view.gotoEntrance()
    }
  }

  render () {
    const { page } = this.props.view

    return (
      page === 'entrance'
        ? <ViewEntrance />
        : page === 'main'
          ? <ViewMain />
          : <ViewLoading />
    )
  }
}

export default App
