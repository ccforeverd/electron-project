# Local File Storage

存储/读取数据到本地文件中

## install

``` js

import * as LocalFileStorage from '@common/utils/local-file-storage'
// or
import { save, load, del } from '@common/utils/local-file-storage'

```

## usage

- LocalFileStorage.save(filename, data, options)
  - filename: string [default: md5(Data.now().toString())]
    - 保存数据的文件名称, 默认一个MD5当前时间, 赋值后依然会生成MD5
  - data: jsonData [default: {}]
    - 数据, json类型
  - options: jsonData
    - options.extname: string [default: '.json']
      - 文件后缀, 默认 `.json`
    - options.dirname: string [default: md5('ccforeverd')]
      - 文件夹名称, 保存到 home 路径下, 以 `ccforeverd-` 为前缀
    - options.secret: boolean|string [default: true]
      - 加密保存, 传值为 true/false 或 一个用于加密的字符串

- LocalFileStorage.load(filename, options)
  - filename 同 save
  - options: jsonData
    - options.extname 同 save
    - options.dirname 同 save
    - options.secret 同 save

- LocalFileStorage.del(filename, options)
  - filename 同 save
  - options: jsonData
    - options.extname 同 save
    - options.dirname 同 save
    - options.secret 同 save
    - options.movetoTrash: boolean [default: true]
      - 移到垃圾桶

- LocalFileStorage.delAll(options)
  - options: jsonData
    - options.preDirname: string [default: 'ccforeverd-']
      - 文件夹前缀, 会删除已这个字符串为前缀的所有文件夹
    - options.movetoTrash 同 del
