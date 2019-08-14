import fs from 'fs'
import FileSaver from 'file-saver'
import { observable, action } from 'mobx'

import StoreSystem from '@store/system'
import tmp from '@config/tmp'

const system = new StoreSystem()

class StoreData {
  @observable json = {} // 全部数据
  @observable current = [] // 当前展示数据

  @action setData (json = {}) {
    this.json = json
  }

  @action setCurrent (...items) {
    this.current = [...items].filter(item => item)
  }

  @action appendItem (list, item) {
    return list.push(item)
  }

  @action updateItem (list, item, newItem) {
    Object.assign(item, newItem)
    return list.replace([item])
  }

  @action deleteItem (list, item) {
    return list.remove(item)
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
      sub: [], // 子项目
      content: [] // 文案
    }
  }

  // 创建一条项目(第二列)
  createSubItem () {
    return {
      title: '未命名子项目',
      content: [] // 文案
    }
  }

  // 保存数据到本地
  save () {
    const jsonString = JSON.stringify(this.json, null, '  ')

    if (!fs.existsSync(tmp.dir)) {
      fs.mkdirSync(tmp.dir)
    }
    if (fs.existsSync(tmp.data)) {
      fs.unlinkSync(tmp.data)
    }
    fs.writeFileSync(tmp.data, jsonString, 'utf8')
  }

  // 从本地读取
  load () {
    if (!fs.existsSync(tmp.dir) || !fs.existsSync(tmp.data)) {
      return null
    }
    
    const jsonString = fs.readFileSync(tmp.data, 'utf8').trim()

    if (jsonString === '' || jsonString === '{}') {
      return null
    }

    return JSON.parse(jsonString)
  }

  // 下载到本地
  download (fileName = '配置文件.json') {
    const jsonString = JSON.stringify(this.json, null, '  ')
    const file = new File([jsonString], fileName, { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(file)
  }

  // TODO 将图片转为base64
  image2base64 (path) {
    console.log(path)
  }
}

export default StoreData
