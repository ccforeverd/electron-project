import React, { Component } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'

import admin from '@config/admin'

class ViewLogin extends Component {

  submit = event => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.username === admin.username && values.password === admin.password) {
          message.success('登录成功')
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
      <Form style={this.props.style} onSubmit={this.submit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.35)' }} />}
              placeholder='用户名'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.35)' }} />}
              type='password'
              placeholder='密码'
            />,
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
