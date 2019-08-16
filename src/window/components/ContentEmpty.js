import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Empty, Button  } from 'antd'

@inject('data')
@observer
class ContentEmpty extends Component {
  render () {
    const { isEditable, data } = this.props

    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ paddingTop: 160, marginTop: 0 }}
        description={isEditable ? '没有数据, 请创建第一条数据' : '没有数据, 请上传数据文件'}
      >
        {this.isEditable
          ? <Button type='primary' onClick={() => data.setData(data.createRoot())}>创建</Button>
          : ''
        }
      </Empty>
    )
  }
}

export default ContentEmpty
