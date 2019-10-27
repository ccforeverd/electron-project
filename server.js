// const childProcess = require('child_process')
// const electronWebpack = require('electron-webpack')

// childProcess.spawn(electronWebpack, ['dev'])
// childProcess.spawn('electron-webpack', ['dev'])

// const Wechat = require('wechat4u')

// const bot = new Wechat()

// bot.start()

// console.log('0000000000')

// const { Wechaty } = require('wechaty')
// const bot = new Wechaty()
// bot.on('scan', (qrcode) => console.log(['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode), '&size=220x220&margin=20'].join('')))
// bot.on('login', user => console.log(`User ${user} logined`))
// bot.on('message', message => console.log(`Message: ${message}`))
// bot.start()

// console.log(process.env.WECHATY_TOKEN)

// console.log('1111111112')

// const http = require('http')

// const hostname = '127.0.0.1' // 可以不写，或者写localhost
// const port = 7888

// // 通过 createServer 创建 web服务器
// const server = http.createServer((req, res) => {
//   // req 请求体：获取请求相关的信息（请求来自哪里、是get还是post）
//   // res 响应体：告诉服务器给请求响应什么内容
//   console.log('req' + req, 'res' + res + 'server.js-------14行')
//   // 设置响应的请求头状态码是200
//   res.statusCode = 200
//   // 设置返回的文本类型：纯文本text/plain
//   res.setHeader('Content-Type', 'application/json')  // 序列化后的 JSON 字符串
//   // 最后给客户端返回 hello world
//   res.end('Hello World!\n' + res + 'server.js-----20')
// })
// //  处理请求, request与click事件一致, 有请求就会触发request
// server.on('request', function (request, response) {
//   console.log('创建服务器成功: http://localhost:3000')
//   // 回调函数的第一参数: 报文的信息
//   // 回调函数的第二参数: 响应的对象

//   // 解决在客户端中文乱码问题
//   response.writeHead(200, { 'Content-Type': 'text/plaincharset=utf-8' })
//   // 给予客户端响应的信息
//   response.write('小阔爱已经在服务器收到了小姐姐的请求了')
//   // 结束响应
//   response.end()
// })
// server.on('clientError', (err, socket) => {
//   if (err) {
//     console.log(err)
//   }
//   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
// })

// server.on('close', () => {
//   console.log('server close')
// })

// server.on('connection', () => {
//   console.log('server connection')
// })

// server.on('error', (error) => {
//   console.log('server error,messmage is' + error)
// })
// // 通过 listen 监听端口 的请求 hostname有就写上，没有可以忽略
// // server.listen(port, hostname, () => {
// server.listen(port, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

require('./src/server')

// console.log('server start')
