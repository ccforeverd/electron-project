// 临时文件夹路径
// 1. 用于保存上传文件和加载时自动载入
import os from 'os'
import path from 'path'

const dir = path.join(os.homedir(), '.electron-project-rc')

export default {
  dir,
  json: path.join(dir, 'data.json')
}
