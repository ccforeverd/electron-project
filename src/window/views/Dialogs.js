import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Button } from 'antd'

import ViewUpload from '@views/Upload'
import ViewLogin from '@views/Login'

@inject('data')
@inject('view')
@observer
class ViewDialogs extends Component {
  render () {
    const { view, view: { dialog } } = this.props

    // 简单浮层属性, 只有一个取消按钮
    const sampleProps = {
      centered: true,
      closable: false,
      maskClosable: true,
      footer: (
        <Button onClick={() => view.closeDialog()}>取消</Button>
      ),
      afterClose: () => view.closeDialog()
    }

    return (
      <section>
        {/* 上传 */}
        <Modal title='上传配置文件' visible={dialog === 'upload'} {...sampleProps}>
          <ViewUpload onUpload={view.callbacks.upload} />
        </Modal>

        {/* 登录 */}
        <Modal title='登录' visible={dialog === 'login'} {...sampleProps}>
          <ViewLogin onLogin={view.callbacks.login} style={{ width: 240, margin: '0 auto' }} />
        </Modal>

        {/* Input */}
        <Modal visible={dialog === 'custom'} {...view.dialogProps}>
          {view.dialogProps.content}
        </Modal>
      </section>
    )
  }
}

export default ViewDialogs
