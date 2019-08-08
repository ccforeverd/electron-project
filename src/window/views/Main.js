import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import ViewProject from '@views/Project'

const { SubMenu } = Menu
const { Content, Sider } = Layout

class ViewMain extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ background: '#fff' }}>
          <Menu mode='inline' style={{ borderRight: 0 }}>
            <Menu.Item key='1'>
              <Icon type='pie-chart' />
              <span>Option 1</span>
            </Menu.Item>
            <SubMenu key='1-1' title={
              <span>
                <Icon type='user' />
                <span>用户</span>
              </span>
            }>
              <Menu.Item key='2'>用户1</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>item1</Breadcrumb.Item>
              <Breadcrumb.Item>item2</Breadcrumb.Item>
            </Breadcrumb>
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
