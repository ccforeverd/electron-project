import fs from 'fs'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Menu, Breadcrumb, Icon, Empty, Button, Modal, message } from 'antd'

import MenuTitle from '@components/MenuTitle'
import ViewUpload from '@views/Upload'
import ViewProject from '@views/Project'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@inject('data')
@inject('system')
@inject('view')
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
    const { data, view } = this.props

    return (
      this.isEmpty
      ? <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ paddingTop: 160, marginTop: 0 }}
        description={this.isEditable ? '没有数据, 请创建第一条数据' : '没有数据, 请上传数据文件'}
      >
        {this.isEditable
          ? <Button type='primary' onClick={() => data.setData(data.createRoot())}>创建</Button>
          : <Button type='primary' onClick={() => view.gotoEntrance()}>去上传</Button>
        }
      </Empty>
      : <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ background: '#fff' }}>
          <Menu mode='inline' style={{ borderRight: 0 }}>
            {
              data.json.content.map((item, index) => {
                const key = `item-${index}`
                const subs = item.sub.map((subItem, subIndex) => (
                  <Menu.Item key={`subitem-${index}-${subIndex}`}>
                    <MenuTitle
                      item={subItem}
                      isEditable={this.isEditable}
                      onDelete={() => data.deleteItem(item.sub, subItem)}
                      onEdit={newItem => data.updateItem(item.sub, subItem, newItem)}
                    />
                  </Menu.Item>
                ))

                if (this.isEditable) {
                  return (
                    <SubMenu key={key} title={
                      <MenuTitle
                        item={item}
                        isEditable={true}
                        onDelete={() => data.deleteItem(data.json.content, item)}
                        onEdit={newItem => data.updateItem(data.json.content, item, newItem)}
                      />
                    }>
                      {subs}
                      <Menu.Item onClick={() => data.appendItem(item.sub, data.createSubItem())}>
                        <Icon type='plus-circle' />
                        <span>添加新的子项目</span>
                      </Menu.Item>
                    </SubMenu>
                  )
                } else {
                  if (item.sub.length > 0) {
                    return (
                      <SubMenu key={key} title={<MenuTitle item={item} />}>{subs}</SubMenu>
                    )
                  } else {
                    return (
                      <Menu.Item key={key}>
                        <MenuTitle item={item} />
                      </Menu.Item>
                    )
                  }
                }
              })
            }
            {this.isEditable &&
              <Menu.Item onClick={() => data.appendItem(data.json.content, data.createItem())}>
                <Icon type='plus-circle' />
                <span>点击添加</span>
              </Menu.Item>
            }
          </Menu>
        </Sider>
        <Layout>
          {this.isEditable &&
            <Header style={{ background: '#f0f2f5', textAlign: 'right', borderBottom: '1px solid #fff' }}>
              <Button type='link' onClick={this.showUpload}>重新上传</Button>
              <Button type='primary' onClick={() => data.download()}>保存</Button>
            </Header>
          }
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
