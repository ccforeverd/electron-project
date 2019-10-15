import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'

import MainEmpty from '@/goverment/components/MainEmpty'
import MainHeader from '@/goverment/components/MainHeader'
import MainMenu from '@/goverment/components/MainMenu'
import MainPath from '@/goverment/components/MainPath'
import MainSettings from '@/goverment/components/MainSettings'

import ViewContent from '@/goverment/views/Content'
import ViewDialogs from '@/goverment/views/Dialogs'

const { Content, Sider } = Layout

@inject('data')
@inject('user')
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

  render () {
    return (
      <main>
        {this.isEmpty
          ? <MainEmpty isEditable={this.isEditable} />
          : (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider style={{ background: '#fff' }}>
                <MainMenu isEditable={this.isEditable} />
                <MainSettings isEditable={this.isEditable} />
              </Sider>
              <Layout>
                {this.isEditable &&
                  <MainHeader />}
                <Content style={{ margin: '16px' }}>
                  <MainPath />
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <ViewContent isEditable={this.isEditable} />
                  </div>
                </Content>
              </Layout>
            </Layout>
          )}
        <ViewDialogs />
      </main>
    )
  }
}

export default ViewMain
