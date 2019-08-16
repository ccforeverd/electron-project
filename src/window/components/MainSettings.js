import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, Menu, Dropdown } from 'antd'

@inject('view')
class MainSettings extends Component {

  dialogUpload = () => {
    this.props.view.dialogUpload()
  }

  dialogLogin = () => {
    this.props.view.dialogLogin(() => {
      this.props.view.closeDialog()
    })
  }

  render () {
    const { isEditable } = this.props

    return (
      <Dropdown overlay={
        isEditable
        ? <Menu>
          <Menu.Item>123</Menu.Item>
          <Menu.Item>123</Menu.Item>
          <Menu.Item>123</Menu.Item>
          <Menu.Item>123</Menu.Item>
          <Menu.Item>123</Menu.Item>
        </Menu>
        : <Menu>
          <Menu.Item onClick={this.dialogUpload}>重新载入配置文件</Menu.Item>
          <Menu.Item onClick={this.dialogLogin}>登录编辑配置文件</Menu.Item>
        </Menu>
      } placement='topLeft'>
        <Icon type='setting' style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 10,
          fontSize: 24
        }} />
      </Dropdown>
    )
  }
}

export default MainSettings
