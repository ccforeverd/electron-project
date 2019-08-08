import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Menu, Breadcrumb, Icon, Empty, Button } from 'antd'
import ViewProject from '@views/Project'

const { SubMenu } = Menu
const { Content, Sider } = Layout

@inject('data')
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
    return this.props.data.editable
  }

  // 创建
  create = () => {
    const data = this.props.data.createRoot()
    this.props.data.setData(data)
  }

  // 去上传
  gotoUpload = () => {}

  render () {
    console.log(this.isEditable, this.isEmpty)
    return (
      this.isEmpty
      ? <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ paddingTop: 100 }}
        description={this.isEditable ? '没有数据, 请创建第一条数据' : '没有数据, 请上传数据文件'}
      >
        {this.isEditable
          ? <Button type='primary' onClick={this.create}>创建</Button>
          : <Button type='primary' onClick={this.gotoUpload}>去上传</Button>
        }
      </Empty>
      : <Layout style={{ minHeight: '100vh' }}>
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
