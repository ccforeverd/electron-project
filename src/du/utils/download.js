
import xlsx from 'node-xlsx'
import FileSaver from 'file-saver'
import { Readable } from 'stream'

export function saveFile () {
  FileSaver.saveAs()
}

export function generateExcel (data, options = {}) {
  const name = '报表'
  const rs = new Readable()
  const buffer = xlsx.build([{ name, data }], options)
  const filename = `${encodeURIComponent(name)}.xlsx`

  console.log(rs, buffer, filename)

  // res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
  // // res.setHeader('Content-type', 'application/x-msdownload')
  // res.setHeader('Content-Type', 'application/vnd.ms-excel')
  // res.setHeader('X-Suggested-Filename', filename)

  // rs.push(buffer)
  // rs.push(null)
  // rs.pipe(res)
}
