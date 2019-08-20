import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Empty, Button  } from 'antd'

@inject('data')
@inject('view')
@observer
class ContentEmpty extends Component {
  append = () => {
    this.props.view.dialogAppend()
  }

  render () {
    const { isEditable } = this.props

    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ paddingTop: 100, marginTop: 0 }}
        description={isEditable ? '没有数据' : '没有数据'}
      >
        {isEditable
          ? <Button type='primary' onClick={this.append}>
            添加数据
          </Button>
          : ''
        }
      </Empty>
    )
  }
}

export default ContentEmpty
