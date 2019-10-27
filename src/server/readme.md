# Electron Server

需要系统安装 `nodejs` 环境

在 `client/index.js` 中通过 `child_process.exec` 执行 `node ./server.js` 启动

这里的 `./server.js` 指的是根目录的文件, 在这个文件中, 直接 `require('./src/server')`

即当前目录下的 `index.js`, 所以当前目录使用 `nodejs` 写法

而在 `client/index.js` 依然引入当前文件夹, 为的是在开发模式可以自动重启应用

在当前目录下的 `index.js` 中, 通过环境变量 `CCFOREVERD_SERVER` 来启动服务器

避免重复启动

----

注意: 当前目录下使用 `nodejs` 书写格式, 即 `require` + `module.exports`, 部分 `es6+` 写法不支持

----

write by ccforeverd <zh1045456074@163.com>

2019.10.27
