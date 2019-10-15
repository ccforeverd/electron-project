// const childProcess = require('child_process')
// const electronWebpack = require('electron-webpack')

// childProcess.spawn(electronWebpack, ['dev'])
// childProcess.spawn('electron-webpack', ['dev'])

// const Wechat = require('wechat4u')

// const bot = new Wechat()

// bot.start()

const { Wechaty } = require('wechaty')
const bot = new Wechaty()
bot.on('scan', (qrcode) => console.log(['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode), '&size=220x220&margin=20'].join('')))
bot.on('login', user => console.log(`User ${user} logined`))
bot.on('message', message => console.log(`Message: ${message}`))
bot.start()

console.log(process.env.WECHATY_TOKEN)
