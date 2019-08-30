
const path = require('path')
const jsconfig = require('../jsconfig.json')
const { paths } = jsconfig.compilerOptions
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = Object.keys(paths).reduce((result, key) => {
  result[key.replace('/*', '')] = resolve(paths[key].toString().replace('/*', ''))
  return result
}, {})

// module.exports = {
//   '@': resolve('src'),
//   '@client': resolve('src/client'),
//   '@common': resolve('src/common'),
//   '@config': resolve('src/common/config'),
//   '@window': resolve('src/window'),
//   '@components': resolve('src/window/components'),
//   '@store': resolve('src/window/store'),
//   '@views': resolve('src/window/views')
// }
