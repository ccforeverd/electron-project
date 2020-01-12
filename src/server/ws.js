
const WebSocket = require('ws')

const { killPort } = require('../utils/port-check-and-kill')
const config = require('./config.json')

const { port } = config.websocket

async function creteWebSocketServer () {
  const result = await killPort(port)

  console.log(result)

  const wss = new WebSocket.Server({
    port
  })

  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(message)
    })
  })

  wss.on('error', console.log)
}

module.exports = {
  creteWebSocketServer
}
