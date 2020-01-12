
const { exec } = require('child_process')

const { isLinux, isMac, isWindows } = require('./utils')

async function killPid (pid) {
  try {
    if (isLinux || isMac) {
      await exec(`kill ${pid}`)
      return { result: true }
    }

    if (isWindows) {
      const msg = await exec(`tasklist|findstr ${pid}`)
      const processName = /(^\S+)/.exec(msg)[1]
      await exec(`taskkill -f -t -im ${processName}`)
      return { result: true }
    }
  } catch (error) {
    return { result: false, error }
  }
}

module.exports = {
  killPid
}
