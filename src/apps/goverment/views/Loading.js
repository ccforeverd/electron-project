import React, { Component } from 'react'
import { Spin } from 'antd'

class ViewLoading extends Component {
  render () {
    return (
      <section
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spin size='large' />
      </section>
    )
  }
}

export default ViewLoading
