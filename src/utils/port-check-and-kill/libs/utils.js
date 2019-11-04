
const os = require('os')

function isWindows () {
  return os.type() === 'Windows_NT'
}

function isMac () {
  return os.type() === 'Darwin'
}

function isLinux () {
  return os.type() === 'Linux'
}

module.exports = {
  isWindows,
  isMac,
  isLinux
}
