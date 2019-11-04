
const { exec } = require('child_process')

const { isLinux, isMac, isWindows } = require('./utils')

async function checkPort (port) {
  try {
    if (isLinux || isMac) {
      const msg = await exec(`lsof -i tcp:${port}`)
      const usedId = /^\S+\s+(\d+)/igm.exec(msg)[1]
      return { result: true, pid: usedId }
    }

    if (isWindows) {
      const msg = await exec(`netstat -ano |findstr ${port}`)
      const pid = /(\d+)$/m.exec(msg)[1]
      return { result: true, pid }
    }
  } catch (error) {
    return { result: false, error }
  }
}

module.exports = {
  checkPort
}
