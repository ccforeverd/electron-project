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
    const commonProps = {
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
        <Modal title='上传配置文件' visible={dialog === 'upload'} {...commonProps}>
          <ViewUpload onUpload={view.callbacks.upload} />
        </Modal>
        <Modal title='登录' visible={dialog === 'login'} {...commonProps}>
          <ViewLogin onLogin={view.callbacks.login} style={{ width: 240, margin: '0 auto' }} />
        </Modal>
      </section>
    )
  }
}

export default ViewDialogs
