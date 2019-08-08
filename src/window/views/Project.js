
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('system')
@inject('user')
@observer
class ViewProject extends Component {
  render () {
    return (
      <section>
        <h1>Project v{this.props.system.project.version}</h1>

        <h2>System environment</h2>
        <h3>Node version: {this.props.system.node.version}</h3>
        <h3>Electron version: {this.props.system.electron.version}</h3>
        <h3>React version: {this.props.system.react.version}</h3>

        <h2>User information</h2>
        <h3>Username: {this.props.user.username}</h3>
      </section>
    )
  }
}

export default ViewProject
