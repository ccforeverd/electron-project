import React, { Component } from 'react'
import { Upload, Icon } from 'antd'

const { Dragger } = Upload

class ViewUpload extends Component {

  onBeforeUpload = file => {
    this.props.onUpload(file)
    return false
  }

  render () {
    return (
      <Dragger
        showUploadList={false}
        beforeUpload={this.onBeforeUpload}
        style={{ padding: '64px 0' }}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="file-text" theme="twoTone" />
        </p>
        <p className="ant-upload-text">
          点击上传文件
        </p>
        <p className="ant-upload-text">
          或将文件拖拽至虚线框内
        </p>
        <p className="ant-upload-hint">
          请注意: 只支持 .json 格式的文件
        </p>
      </Dragger>
    )
  }
}

export default ViewUpload
