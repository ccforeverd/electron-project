import React, { Component, Fragment } from 'react'
import { inject } from 'mobx-react'
import { Icon, Button, Input } from 'antd'

@inject('view')
class MenuTitle extends Component {

  state = {
    inputId: 'menu-title-input'
  }

  onCancel = () => {
    this.props.view.closeDialog()
  }

  onDelete = () => {
    this.props.onDelete && this.props.onDelete()
    this.props.view.closeDialog()
  }

  onSave = () => {
    const { value } = document.getElementById(this.state.inputId)
    this.props.onEdit && this.props.onEdit({ title: value })
    this.props.view.closeDialog()
  }

  showEdit = event => {
    event.stopPropagation()

    this.props.view.dialogCustom({
      title: '编辑标题',
      content: (
        <Input id={this.state.inputId} autoFocus defaultValue={this.props.item.title} />
      ),
      footer: (
        <Fragment>
          <Button onClick={this.onCancel}>取消</Button>
          <Button type='danger' onClick={this.onDelete}>删除</Button>
          <Button type='primary' onClick={this.onSave}>保存</Button>
        </Fragment>
      ),
      onCancel: this.onCancel
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
