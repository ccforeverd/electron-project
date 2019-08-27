import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, Icon } from 'antd'

import MenuTitle from './MenuTitle'

const { SubMenu } = Menu

@inject('data')
@inject('view')
@observer
class MainMenu extends Component {
  handleSelect = ({ key }) => {
    const { json } = this.props.data
    const [, index, subIndex] = key.split('-')
    const item = json.content[index]
    const subItem = item.sub[subIndex]

    this.props.data.setCurrent(item, subItem)
    this.props.view.contentShow()
  }

  render () {
    const { isEditable, data } = this.props

    return (
      <Menu
        mode='inline'
        style={{ borderRight: 0 }}
        onSelect={this.handleSelect}
      >
        {
          data.json.content.map((item, index) => {
            const key = `item-${index}`
            const subs = item.sub.map((subItem, subIndex) => (
              <Menu.Item key={`subitem-${index}-${subIndex}`}>
                <MenuTitle
                  item={subItem}
                  isEditable={isEditable}
                  onDelete={() => data.deleteItem(item.sub, subItem)}
                  onEdit={newItem => data.updateItem(item.sub, subItem, newItem)}
                />
              </Menu.Item>
            ))
            const subTitle = (
              <MenuTitle
                item={item}
                isEditable
                onDelete={() => data.deleteItem(data.json.content, item)}
                onEdit={newItem => data.updateItem(data.json.content, item, newItem)}
              />
            )

            if (isEditable) {
              return (
                <SubMenu
                  key={key}
                  title={subTitle}
                >
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
        {isEditable &&
          <Menu.Item onClick={() => data.appendItem(data.json.content, data.createItem())}>
            <Icon type='plus-circle' />
            <span>点击添加</span>
          </Menu.Item>}
      </Menu>
    )
  }
}

export default MainMenu
