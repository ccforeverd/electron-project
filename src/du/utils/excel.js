
import xlsx from 'node-xlsx'
import FileSaver from 'file-saver'
// import { Readable } from 'stream'

export function saveFile () {
  FileSaver.saveAs()
}

export function generate (data, options = {}) {
  // buffer
  return xlsx.build([{ name: 'sheet1', data }], options)

  // res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
  // // res.setHeader('Content-type', 'application/x-msdownload')
  // res.setHeader('Content-Type', 'application/vnd.ms-excel')
  // res.setHeader('X-Suggested-Filename', filename)

  // rs.push(buffer)
  // rs.push(null)
  // rs.pipe(res)
}
