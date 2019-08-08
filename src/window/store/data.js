import fs from 'fs'
import { observable, action } from 'mobx'

import StoreSystem from '@store/system'
import tmp from '@config/tmp'

const system = new StoreSystem()

class StoreData {
  @observable json = {}
  @observable editable = process.env.NODE_ENV === 'development' // 是否可编辑

  @action setData (json = {}) {
    this.json = json
  }

  @action setEditable (bool = false) {
    this.editable = bool
  }

  // 创建跟数据
  createRoot () {
    return {
      node: system.node.version,
      electron: system.electron.version,
      react: system.react.version,
      project: system.project.version,
      content: [
        this.createItem()
      ]
    }
  }

  // 创建一条项目(第一列)
  createItem () {
    return {
      icon: 'book', // paper-clip start
      title: '未命名',
      sub: [],
      content: ''
    }
  }

  // 创建一条项目(第二列)
  createSubItem () {
    return {
      content: ''
    }
  }

  // 保存数据到本地
  save () {
    const jsonString = JSON.stringify(this.json, null, '  ')

    if (!fs.existsSync(tmp.dir)) {
      fs.mkdirSync(tmp.dir)
    }
    if (fs.existsSync(tmp.json)) {
      fs.unlinkSync(tmp.json)
    }
    fs.writeFileSync(tmp.json, jsonString, 'utf8')
  }

  // 从本地读取
  load () {
    if (!fs.existsSync(tmp.dir) || !fs.existsSync(tmp.json)) {
      return null
    }
    
    const jsonString = fs.readFileSync(tmp.json, 'utf8').trim()

    if (jsonString === '' || jsonString === '{}') {
      return null
    }

    return JSON.parse(jsonString)
  }

  // TODO 将图片转为base64
  image2base64 (path) {
    console.log(path)
  }
}

export default StoreData
