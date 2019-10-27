# Electron Apps by Ccforeverd

使用 [`electron-webpack`](https://github.com/electron-userland/electron-webpack) 快速搭建

## 安装

正常通过 `yarn` 或 `npm i` 命令来安装

如果因为安装源问题安装失败

可以配置淘宝安装镜像, 具体请百度

并且在 `package.json` 的 `scripts` 中有一个 `i` 命令

执行 `yarn i` 或者 `npm run i` 可以通过镜像安装所有依赖

## 结构

根目录大部分是配置文件

文件夹 src 里是主要开发文件

其中:

- `apps` 文件夹存放各种应用开发文件
- `client` 文件夹存放客户端开发文件
- `server` 文件夹存放服务端开发文件
- `utils` 文件夹存放通用工具文件

## 配置

在 `electron-webpacl.json` 的 `renderer` 项

其中 `sourceDirectory` 指向当前开发和打包的应用

如果要更换应用, 修改该项即可

未来如果频繁更换项目开发和打包, 我会写个脚本来简化操作

## 打包

使用 [`electron-builder`](https://www.electron.build/) 进行打包

通过 `yarn dist:win` 或 `npm run dist:win` 命令来打包Windows应用

通过 `yarn dist:mac` 或 `npm run dist:mac` 命令来打包MacOS应用

## 说明

- 服务端 [`./src/server/readme.md`](./src/server/readme.md)
- 工具文件 [`开发中`](./src/utils/readme.md)
- 应用: [阿迪达斯微信公众号抽签客户端](./src/apps/adidas-wechat/readme.md)

----

Write by ccforeverd <zh1045456074@163.com>

2019.10.27
