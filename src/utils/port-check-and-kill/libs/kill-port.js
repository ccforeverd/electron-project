
const { checkPort } = require('./check-port')
const { killPid } = require('./kill-pid')

async function killPort (port) {
  const { result, pid, error } = await checkPort(port)
  if (result) {
    const data = await killPid(pid)
    return data
  } else {
    return { result, error }
  }
}

module.exports = {
  killPort
}
