import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Icon, Button, message } from 'antd'

import admin from '@config/admin'

@inject('user')
@observer
class ViewLogin extends Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        if (username === admin.username && password === admin.password) {
          message.success('登录成功')
          this.props.user.set(username, this.props.user.ROLE_ADMIN)
          this.props.onLogin()
        } else {
          message.error('用户名/密码不正确')
        }
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form style={this.props.style} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.35)' }} />}
              placeholder='用户名'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.35)' }} />}
              type='password'
              placeholder='密码'
            />
          )}
        </Form.Item>
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          登录
        </Button>
      </Form>
    )
  }
}

const WrappedViewLogin = Form.create({ name: 'login' })(ViewLogin)

export default WrappedViewLogin
