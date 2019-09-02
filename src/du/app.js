import React, { Component } from 'react'
import { Tabs, Input, Row, Col, Table, Upload, Icon, Switch, Select } from 'antd'

import { captions, nikeMen, nikeWomen } from './utils/size'
import { parseNumbersString, parseImageString } from './handles/dataParse'

import mockNumbers from './mock/numbers'
import mockImage from './mock/image'

const { TabPane } = Tabs
const { TextArea } = Input
const { Dragger } = Upload
const { Option } = Select

class App extends Component {
  state = {
    showNumber: [],
    showNumberType: -1,
    showImage: [],
    previewImage: '',
    showSex: 'male', // female
    showTable: []
  }

  handleInput = () => {
    clearTimeout(this._handleInputTimer)
    this._handleInputTimer = setTimeout(() => {
      this.parseNumberText(this.textarea.textAreaRef.value)
    }, 300)
  }

  handleSwitch = checked => {
    this.setState({
      showSex: checked ? 'male' : 'female'
    })
    this.generateTable()
  }

  handleSelect = value => {
    this.setState({
      showNumberType: value
    })
    this.handleInput()
  }

  beforeUpload = async file => {
    // 预览
    const preview = new FileReader()
    preview.readAsDataURL(file)
    preview.onload = () => {
      this.setState({
        previewImage: preview.result
      })
    }

    // 读取
    // const text = await this.readImage(file.path)
    const text = mockImage // 测试

    // 展示
    this.parseImageText(text)

    return false
  }

  parseNumberText = text => {
    try {
      this.setState({
        showNumber: parseNumbersString(text)
      })
    } catch (e) {
      this.setState({
        showNumber: []
      })
      console.log('parseNumberText error', e)
    }
    this.generateTable()
  }

  parseImageText = text => {
    try {
      this.setState({
        showImage: parseImageString(text)
      })
    } catch (e) {
      this.setState({
        showImage: []
      })
      console.log('parseImageText error', e)
    }
    this.generateTable()
  }

  generateTable = () => {
    // 延时等待setState
    setTimeout(() => {
      const {
        showImage,
        showNumber,
        showSex
      } = this.state

      if (!showImage.length || !showNumber.length) {
        return this.setState({
          showTable: []
        })
      }

      const sizeMap = {
        male: nikeMen,
        female: nikeWomen
      }[showSex]

      console.log(sizeMap)
      // showNumber.map(numberItem => {
      //   numberItem.size
      // })
    }, 10)
  }

  componentDidMount = () => {
    this.handleInput()

    // 测试
    setTimeout(() => {
      this.parseImageText(mockImage)
    }, 400)
  }

  render () {
    const sexButton = (
      <span>
        女鞋
        <Switch
          defaultChecked
          size='small'
          style={{ margin: '0 4px' }}
          onChange={this.handleSwitch}
        />
        男鞋
      </span>
    )

    return (
      <main style={{ padding: '0 30px' }}>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='尺码和数量' key='1'>
            <Row gutter={16}>
              <Col span={12}>
                <TextArea
                  ref={node => (this.textarea = node)}
                  autosize
                  onChange={this.handleInput}
                  defaultValue={mockNumbers} // 测试
                />
                <Select
                  placeholder='请选择尺码类型, 默认美码'
                  onChange={this.handleSelect}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  {
                    captions.map((item, index) => (
                      <Option value={index} key={index}>{item}</Option>
                    ))
                  }
                </Select>
              </Col>
              <Col span={12}>
                {this.state.showNumber.length &&
                  <Table
                    columns={[
                      {
                        title: 'Size',
                        dataIndex: 'size'
                      },
                      {
                        title: 'Count',
                        dataIndex: 'number'
                      }
                    ]}
                    dataSource={this.state.showNumber}
                    rowKey='size'
                    pagination={false}
                    size='small'
                  />}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='毒APP截图' key='1'>
            <Row gutter={16}>
              <Col span={12}>
                <Dragger
                  multiple={false}
                  showUploadList={false}
                  accept='.jpg,.jpeg,.png'
                  beforeUpload={this.beforeUpload}
                >
                  <p className='ant-upload-drag-icon'><Icon type='plus' /></p>
                  <p className='ant-upload-text'>点击上传或拖入图片</p>
                  <p className='ant-upload-hint'>只支持.jpg,.jpeg,.png格式</p>
                </Dragger>
                <img
                  src={this.state.previewImage}
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: 16
                  }}
                />
              </Col>
              <Col span={12}>
                <Table
                  columns={[
                    {
                      title: 'Size',
                      dataIndex: 'size'
                    },
                    {
                      title: 'Price',
                      dataIndex: 'price'
                    }
                  ]}
                  dataSource={this.state.showImage}
                  rowKey='size'
                  pagination={false}
                  size='small'
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey='1' tabBarExtraContent={sexButton}>
          <TabPane tab='表格' key='1'>
            123
          </TabPane>
        </Tabs>
      </main>
    )
  }
}

export default App
