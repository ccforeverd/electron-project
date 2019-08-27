import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Icon, Button, Input } from 'antd'

@inject('view')
class MenuTitle extends Component {
  state = {
    inputId: 'menu-title-input'
  }

  handleCancel = () => {
    this.props.view.closeDialog()
  }

  handleDelete = () => {
    this.props.onDelete && this.props.onDelete()
    this.props.view.closeDialog()
  }

  handleSave = () => {
    const { value } = document.getElementById(this.state.inputId)
    this.props.onEdit && this.props.onEdit({ title: value })
    this.props.view.closeDialog()
  }

  handleEdit = event => {
    event.stopPropagation()

    this.props.view.dialogCustom({
      title: '编辑标题',
      content: (
        <Input id={this.state.inputId} autoFocus defaultValue={this.props.item.title} />
      ),
      footer: (
        <>
          <Button onClick={this.handleCancel}>取消</Button>
          <Button type='danger' onClick={this.handleDelete}>删除</Button>
          <Button type='primary' onClick={this.handleSave}>保存</Button>
        </>
      ),
      onCancel: this.handleCancel
    })
  }

  render () {
    const { item, isEditable } = this.props

    return (
      <span>
        {item.icon &&
          <Icon type={item.icon} />}
        {isEditable &&
          <Icon type='edit' onClick={this.handleEdit} />}
        <span>{item.title}</span>
      </span>
    )
  }
}

export default MenuTitle
