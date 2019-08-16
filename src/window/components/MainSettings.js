import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, Menu, Dropdown } from 'antd'

@inject('data')
@inject('view')
@inject('user')
class MainSettings extends Component {

  dialogUpload = () => {
    this.props.view.dialogUpload()
  }

  dialogLogin = () => {
    this.props.view.dialogLogin(() => {
      this.props.view.closeDialog()
    })
  }

  contentProject = () => {
    this.props.view.contentProject()
    this.props.data.setCurrent()
  }

  render () {
    const { isEditable } = this.props

    return (
      <Dropdown overlay={
        isEditable
        ? <Menu>
          <Menu.Item onClick={this.contentProject}>系统信息</Menu.Item>
          <Menu.Item onClick={() => this.props.user.logout()}>退出登录/退出编辑</Menu.Item>
        </Menu>
        : <Menu>
          <Menu.Item onClick={this.contentProject}>系统信息</Menu.Item>
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
