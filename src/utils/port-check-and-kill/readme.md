# PORT-CHECK-AND-KILL

检查端口占用和杀死进程, 支持Windows和Mac系统

## install

``` js

import * as PortCheckAndKill from '@common/utils/port-check-and-kill'
// or
import { checkPort, killPid, killPort } from '@common/utils/port-check-and-kill'

```

## usage

- PortCheckAndKill.checkPort(port)
  - port: number|string 端口号
- PortCheckAndKill.killPid(pid)
  - pid: number|string 进程号
- PortCheckAndKill.killPort(port)
  - port: number|string 端口号

返回 json:

- result: true|false 是否成功
- pid: 程序id
- error: 报错
