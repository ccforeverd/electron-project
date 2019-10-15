import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Layout, Button } from 'antd'

const { Header } = Layout

@inject('data')
@inject('view')
class MainHeader extends Component {
  // 重新上传
  handleReUpload = () => {
    this.props.view.dialogUpload(data => {
      this.props.data.setData(data)
      this.props.view.closeDialog()
    })
  }

  // 保存
  handleSave = () => {
    this.props.data.download()
  }

  render () {
    return (
      <Header
        style={{
          background: '#f0f2f5',
          textAlign: 'right',
          borderBottom: '1px solid #fff'
        }}
      >
        <Button type='link' onClick={this.handleReUpload}>重新上传</Button>
        <Button type='primary' onClick={this.handleSave}>保存</Button>
      </Header>
    )
  }
}

export default MainHeader
