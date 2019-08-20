import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Empty, Button } from 'antd'

@inject('data')
@inject('view')
class MainEmpty extends Component {
  render () {
    const { isEditable,  data, view } = this.props

    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ paddingTop: 160, marginTop: 0 }}
        description={isEditable ? '没有数据, 请创建第一条数据' : '没有数据, 请上传数据文件'}
      >
        {isEditable
          ? <Button type='primary' onClick={() => data.setData(data.createRoot())}>创建</Button>
          : <Button type='primary' onClick={() => view.gotoEntrance()}>去上传</Button>
        }
      </Empty>
    )
  }
}

export default MainEmpty
