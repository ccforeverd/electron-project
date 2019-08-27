import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, Menu, Dropdown, Modal } from 'antd'

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

  dialogLogout = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确定退出登录? 未保存的修改将会被舍弃',
      cancelText: '取消',
      okText: '确定',
      onCancel: close => close(),
      onOk: close => {
        this.props.user.logout()
        close()        
      }
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
          <Menu.Item onClick={this.dialogLogout}>退出登录/退出编辑</Menu.Item>
        </Menu>
        : <Menu>
          <Menu.Item onClick={this.contentProject}>系统信息</Menu.Item>
          <Menu.Item onClick={this.dialogUpload}>重新上传文件</Menu.Item>
          <Menu.Item onClick={this.dialogLogin}>进入编辑模式</Menu.Item>
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
