import React, { Component } from 'react'
import { Icon, Modal, Input } from 'antd'

class MenuTitle extends Component {

  showEdit = event => {
    const id = `MenuTitleModalInput-${Math.random()}`

    event.stopPropagation()
    Modal.destroyAll()
    Modal.confirm({
      icon: 'edit',
      title: '编辑',
      content: (
        <Input id={id} defaultValue={this.props.item.title} />
      ),
      centered: true,
      maskClosable: true,
      cancelText: '删除',
      cancelButtonProps: {
        type: 'danger'
      },
      onCancel: close => {
        this.props.onDelete && this.props.onDelete()
        close()
      },
      okText: '保存',
      onOk: close => {
        const { value } = document.getElementById(id)
        this.props.onEdit && this.props.onEdit({ title: value })
        close()
      }
    })
  }

  render () {
    const { item, isEditable } = this.props

    return (
      <span>
        {item.icon &&
          <Icon type={item.icon} />
        }
        {isEditable &&
          <Icon type='edit' onClick={this.showEdit} />
        }
        {
          <span>{item.title}</span>
        }
      </span>
    )
  }
}

export default MenuTitle
