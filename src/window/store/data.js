import fs from 'fs'
import { observable, action } from 'mobx'

import tmp from '@config/tmp'

class StoreData {
  @observable json = {}
  @observable editable = false // 是否可编辑

  @action setData (json = {}) {
    this.json = json
  }

  @action setEditable (bool = false) {
    this.editable = bool
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
