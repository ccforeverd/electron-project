import fs from 'fs'
import path from 'path'
import { remote, shell } from 'electron'
import React, { Component } from 'react'
import { Tabs, Input, Row, Col, Table, Upload, Icon, Switch, Select, Card, Divider, Layout, Button, Modal } from 'antd'
import xlsx from 'node-xlsx'

import { captions, nikeMen, nikeWomen } from './utils/size'
import { parseNumbersString, parseImageString } from './utils/dataParse'

import mockNumbers from './mock/numbers'
import mockImage from './mock/image'

import sampleImage from './assets/sample.png'

const { dialog } = remote
const { TabPane } = Tabs
const { TextArea } = Input
const { Dragger } = Upload
const { Option } = Select
const { Footer } = Layout

class App extends Component {
  state = {
    showNumber: [], // 数量展示列表
    inputCaption: -1, // 选择的尺码单位
    inputSingle: 0, // 输入的单价
    inputTotal: 0, // 输入的总价
    showImage: [], // 图片价格展示列表
    showPreview: '', // 预览上传图片
    showSex: 'male', // female 男码或女码
    showTable: [], // 最终大表格
    showTableColumns: [ // 大表格结构
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size'
      },
      {
        title: 'Count',
        dataIndex: 'number',
        key: 'number'
      },
      {
        title: 'Desc',
        dataIndex: 'imageSize',
        key: 'imageSize'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '3.5%',
        dataIndex: 'price1',
        key: 'price1'
      },
      {
        title: '5%',
        dataIndex: 'price2',
        key: 'price2'
      }
    ]
  }

  handleInput = (e, key) => {
    clearTimeout(this._handleInputTimer)
    this._handleInputTimer = setTimeout(() => {
      this.parseNumberText(this.textarea.textAreaRef.value || mockNumbers)
    }, 300)

    if (e && key) {
      this.setState({
        [key]: e.target.value
      })
    }
  }

  handleSwitch = checked => {
    this.setState({
      showSex: checked ? 'male' : 'female'
    })
    this.generateTable()
  }

  handleSelect = value => {
    this.setState({
      inputCaption: value
    })
    this.handleInput()
  }

  handleDownload = () => {
    const columns = this.state.showTableColumns
    const data = [
      columns.map(item => item.title),
      Array(columns.length).fill(''),
      ...this.state.showTable.map(item => columns.map(col => item[col.dataIndex] || ''))
    ]
    // TODO: 列宽调整
    const uint8 = xlsx.build([{ name: 'sheet1', data }])
    // 参考: https://github.com/SheetJS/js-xlsx
    // 参考: https://github.com/SheetJS/js-xlsx/blob/master/demos/electron/index.js
    const targetPath = dialog.showSaveDialogSync({
      title: 'Save file as',
      defaultPath: 'SneakerSheet',
      filters: [{
        name: 'SneakerSheet',
        extensions: 'xls|xlsx|xlsm|xlsb'.split('|')
      }]
    })

    if (targetPath) {
      fs.writeFileSync(targetPath, uint8, 'utf8')
      Modal.confirm({
        title: '下载成功!',
        okText: '打开文件',
        icon: <Icon type='check-circle' style={{ color: '#52c41a' }} />,
        onOk: () => {
          shell.openItem(targetPath)
        },
        cancelText: '打开文件夹',
        onCancel: () => {
          shell.openItem(path.dirname(targetPath))
        }
      })
    }
  }

  beforeUpload = async file => {
    // 预览
    const preview = new FileReader()
    preview.readAsDataURL(file)
    preview.onload = () => {
      this.setState({
        showPreview: preview.result
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
        inputCaption,
        showSex
      } = this.state

      if (!showImage.length || !showNumber.length) {
        return this.setState({
          showTable: []
        })
      }

      const sizeMap = { male: nikeMen, female: nikeWomen }[showSex] // 尺码表
      const captionNumber = inputCaption < 0 ? 4 : inputCaption // 输入尺寸, 默认美码
      const captionImage = 2 // 图片中的尺寸认为是欧码

      // 价格计算
      const getPrices = (itemPrice, itemNumber, percent, key) => {
        const price = parseFloat((itemPrice || '0').replace('¥', ''))
        const single = price ? price * (1 - (percent + 1) / 100) - 8 - 15 - 10 : 0
        const total = single * itemNumber
        const income = this.state.inputSingle ? single - this.state.inputSingle : 0
        const incomeText = income > 0 ? `+${income.toFixed(2)}` : `-${Math.abs(income).toFixed(2)}`
        return {
          [key]: price ? `${single.toFixed(2)}${income ? ` (${incomeText})` : ''}` : '',
          [`${key}Total`]: total
        }
      }

      const result = showNumber.map(numberItem => {
        const sizeItem = sizeMap.find(sizeItem => sizeItem[captionNumber] === parseFloat(numberItem.size))
        if (!sizeItem) {
          // 未找到对应尺码
          return {
            key: numberItem.size,
            size: `${captions[captionNumber]} ${numberItem.size}`,
            number: numberItem.number,
            imageSize: '❌尺码 ❌'
          }
        }

        const imageItem = showImage.find(imageItem => sizeItem[captionImage] === parseFloat(imageItem.size))
        if (!imageItem) {
          // 未找到对应价格
          return {
            key: numberItem.size,
            size: `${captions[captionNumber]} ${numberItem.size}`,
            number: numberItem.number,
            imageSize: `❌${captions[captionImage]} ${sizeItem[captionImage]} ❌`
          }
        }

        return {
          key: numberItem.size,
          size: `${captions[captionNumber]} ${numberItem.size}`,
          number: numberItem.number,
          imageSize: `${captions[captionImage]} ${imageItem.size}`,
          price: imageItem.price, // 图片价格
          ...getPrices(imageItem.price, numberItem.number, 3.5, 'price1'),
          ...getPrices(imageItem.price, numberItem.number, 5, 'price2')
        }
      })

      const totalItem = {
        key: 'total',
        size: '累计',
        number: result.reduce((result, item) => result + parseInt(item.number), 0),
        imageSize: '',
        price: '',
        price1: result.reduce((result, item) => result + (item.price1Total || 0), 0).toFixed(2),
        price2: result.reduce((result, item) => result + (item.price2Total || 0), 0).toFixed(2)
      }

      result.push(totalItem)

      if (this.state.inputTotal) {
        const price1Income = totalItem.price1 - this.state.inputTotal
        const price2Income = totalItem.price2 - this.state.inputTotal
        result.push({
          key: 'income',
          size: '总收益',
          number: '',
          imageSize: '',
          price: '',
          price1: price1Income.toFixed(2),
          price2: price2Income.toFixed(2),
          price1Income,
          price2Income
        })
      } else if (this.state.inputSingle) {
        const price1Income = totalItem.price1 - this.state.inputSingle * totalItem.number
        const price2Income = totalItem.price2 - this.state.inputSingle * totalItem.number
        result.push({
          key: 'income',
          size: '总收益',
          number: '',
          imageSize: '',
          price: '',
          price1: price1Income.toFixed(2),
          price2: price2Income.toFixed(2),
          price1Income,
          price2Income
        })
      }

      const incomeItem = result[result.length - 1]

      if (incomeItem.key === 'income') {
        const price1PerIncome = incomeItem.price1Income / totalItem.number
        const price2PerIncome = incomeItem.price2Income / totalItem.number
        result.push({
          key: 'per-income',
          size: '平均收益',
          number: '',
          imageSize: '',
          price: '',
          price1: price1PerIncome.toFixed(2),
          price2: price2PerIncome.toFixed(2)
        })
      }

      this.setState({
        showTable: result
      })
    }, 10)
  }

  componentDidMount = () => {
    // 测试
    setTimeout(() => {
      this.parseNumberText(mockNumbers)
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
          <TabPane tab='尺码, 数量, 价格' key='1'>
            <Row gutter={16}>
              <Col span={12}>
                <TextArea
                  ref={node => (this.textarea = node)}
                  autosize
                  onChange={this.handleInput}
                  placeholder={`\n示例:${mockNumbers}\n*支持 a*b, axb, aXb`}
                  // defaultValue={mockNumbers} // 测试
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
                <Card style={{ marginTop: 16 }}>
                  <Input
                    placeholder='选填, 同时填写优先使用总价'
                    addonBefore='单价'
                    onChange={e => this.handleInput(e, 'inputSingle')}
                  />
                  <Divider>或</Divider>
                  <Input
                    placeholder='两者均未填写时表格不展示收益'
                    addonBefore='总价'
                    onChange={e => this.handleInput(e, 'inputTotal')}
                  />
                </Card>
              </Col>
              <Col span={12}>
                {
                  this.state.showNumber.length
                    ? (
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
                      />
                    )
                    : ''
                }
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
                <div style={{ width: '100%', position: 'relative' }}>
                  {
                    this.state.showPreview
                      ? ''
                      : (
                        <div
                          style={{
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            textAlign: 'center',
                            fontSize: 80,
                            fontWeight: 'bold',
                            color: 'red',
                            opacity: 0.7,
                            lineHeight: '3em',
                            display: this.state.showPreview ? 'none' : 'block'
                          }}
                        >
                          样 本
                        </div>
                      )
                  }
                  <img
                    src={this.state.showPreview || sampleImage}
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: 16
                    }}
                  />
                </div>
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
            <Table
              columns={this.state.showTableColumns}
              dataSource={this.state.showTable}
              pagination={false}
            />
            {
              this.state.showTable.length
                ? (
                  <Divider>
                    <Button onClick={this.handleDownload}>⬇️下载报表</Button>
                  </Divider>
                )
                : ''
            }
          </TabPane>
        </Tabs>
        <Footer style={{ background: '#fff', textAlign: 'center' }}>
          <Divider>Got`em</Divider>
          感谢使用~~
          有改进意见请发送邮件到
          🍋
          <a href='mailto:zh1045456074@163.com'>🍋zh1045456074@163.com 🍋</a>
          🍋
        </Footer>
      </main>
    )
  }
}

export default App
