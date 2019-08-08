import fs from 'fs'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Result, Icon, Button, message } from 'antd'

import ViewLogin from '@views/Login'
import ViewUpload from '@views/Upload'

@inject('data')
@inject('view')
@observer
class ViewEntrance extends Component {

  state = {
    tab: 0
  }

  tab = (tab) => {
    this.setState({ tab })
  }

  // 上传 (是否保存文件, 编辑时不保存文件, 只有上传时保存)
  onUpload = (file, save) => {
    const jsonString = fs.readFileSync(file.path, 'utf8')
    const json = JSON.parse(jsonString)

    this.props.data.setData(json)
    save && this.props.data.save()

    this.props.view.gotoMain()
    message.success('上传成功')
  }

  // 首页登录, 进入选择页面
  onLogin = () => {
    this.tab(2)
    this.props.data.setEditable(true)
  }

  // 选择页面创建新文件, 清空数据并配置为可编辑状态
  onClick = () => {
    this.props.data.setData()
    this.props.data.setEditable(true)
    this.props.view.gotoMain()
  }

  render () {
    return (
      <section style={{ paddingTop: 100 }}>
        {this.state.tab === 0 &&
          <Card
            title='载入配置文件'
            style={{ width: 400, margin: '0 auto' }}
            extra={<a href='javascript:;' onClick={() => this.tab(1)}>登录编辑</a>}
          >
            <ViewUpload onUpload={file => this.onUpload(file, true)} />
          </Card>
        }

        {this.state.tab === 1 &&
          <Card
            title='登录'
            style={{ width: 400, margin: '0 auto' }}
            extra={<a href='javascript:;' onClick={() => this.tab(0)}>返回</a>}
          >
            <ViewLogin style={{ width: 240, margin: '0 auto' }} onLogin={this.onLogin} />
          </Card>
        }

        {this.state.tab === 2 &&
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <Card title='创建新文件' style={{ width: 300, marginRight: 20 }}>
              <Result
                icon={<Icon type='edit' theme='twoTone' />}
                extra={<Button type='primary' onClick={this.onClick}>开始</Button>}
              />
            </Card>
            <Card title='上传文件进行编辑' style={{ width: 300 }}>
              <ViewUpload onUpload={file => this.onUpload(file, false)} />
            </Card>
          </section>
        }
      </section>
    )
  }
}

export default ViewEntrance
