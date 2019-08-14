import fs from 'fs'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Button, Modal, message } from 'antd'

import MainEmpty from '@components/MainEmpty'
import MainMenu from '@components/MainMenu'
import MainPath from '@components/MainPath'

import ViewUpload from '@views/Upload'
import ViewProject from '@views/Project'

const { Header, Content, Sider } = Layout

@inject('data')
@inject('user')
@inject('system')
@observer
class ViewMain extends Component {

  // 是否是空数据
  get isEmpty () {
    const { json } = this.props.data
    return !(json && Array.isArray(json.content) && json.content.length > 0)
  }

  // 是否是编辑状态
  get isEditable () {
    return this.props.user.role === this.props.user.ROLE_ADMIN
  }

  showUpload = () => {
    // TODO showUpload
    Modal.info({
      title: '上传文件',
      content: (
        <ViewUpload onUpload={this.onUpload} />
      ),
      okText: '取消',
      okType: 'default',
      onOk: close => close()
    })
  }

  onUpload = file => {
    const jsonString = fs.readFileSync(file.path, 'utf8')
    const json = JSON.parse(jsonString)

    this.props.data.setData(json)
    message.success('上传成功')
    Modal.destroyAll()
  }

  render () {
    const { data } = this.props

    return (
      this.isEmpty
      ? <MainEmpty isEditable={this.isEditable} />
      : <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ background: '#fff' }}>
          <MainMenu isEditable={this.isEditable} />
        </Sider>
        <Layout>
          {this.isEditable &&
            <Header style={{ background: '#f0f2f5', textAlign: 'right', borderBottom: '1px solid #fff' }}>
              <Button type='link' onClick={this.showUpload}>重新上传</Button>
              <Button type='primary' onClick={() => data.download()}>保存</Button>
            </Header>
          }
          <Content style={{ margin: '0 16px' }}>
            <MainPath />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {/* main content */}
              <ViewProject />
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default ViewMain
