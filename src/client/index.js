'use strict'

// import childProcess from 'child_process'
import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import childProcess from 'child_process'

import '../server'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
let serverExec

function createMainWindow () {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  // serverExec = childProcess.exec('node ./server.js', function (error, stdout, stderr) {
  //   if (error) {
  //     console.log(error.stack)
  //     console.log('Error code: ' + error.code)
  //     return
  //   }
  //   console.log(`
  // pid: ${process.pid}
  // stderr: ${stderr}
  // server-exec output:

  // ${stdout}

  //   `)
  // })

  if (process.platform === 'darwin') {
    serverExec = childProcess.exec('CCFOREVERD_SERVER=1 node ./server.js')
  } else {
    serverExec = childProcess.exec('set CCFOREVERD_SERVER=1 node .\\server.js')
  }

  if (!serverExec._hasAddedListeners) {
    serverExec._hasAddedListeners = true
    serverExec.stdout.on('data', data => {
      console.log(data)
    })
    serverExec.stderr.on('data', data => {
      console.log(data)
    })
  }

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()

    if (!serverExec) {
      // console.log('serverExec is null')
    } else {
      childProcess.exec('taskkill /f /t /im node.exe', function (error, stdout, stderr) {
        if (error) {
          console.log(error.stack)
          console.log('Error code: ' + error.code)
          return
        }
        console.log('使用exec方法输出: ' + stdout)
        console.log(`stderr: ${stderr}`)
      })
    }
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  // const child = childProcess.fork(
  //   './node',
  //   ['./wechaty.js'],
  //   {
  //     // cwd: electron.remote.app.getAppPath()
  //     cwd: process.cwd()
  //   }
  // )
  // child.on('message', data => {
  //   console.log(data)
  // })
  // setTimeout(() => child.send({ aaa: 111 }), 1000)
  // require('child_process').fork(
  //   './node',
  //   ['./wechat.js']
  // )

  mainWindow = createMainWindow()
})
