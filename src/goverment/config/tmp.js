// 临时文件夹路径
// 1. 用于保存上传文件和加载时自动载入
import os from 'os'
import path from 'path'

const dir = path.join(os.homedir(), '.electron-project-rc')

export default {
  dir,
  data: path.join(dir, 'data.json'), // 展示数据
  table: path.join(dir, 'table.json') // 流程数据
}
