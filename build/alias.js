
const path = require('path')

const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = {
  '@': resolve('src'),
  '@client': resolve('src/client'),
  '@common': resolve('src/common'),
  '@config': resolve('src/common/config'),
  '@window': resolve('src/window'),
  '@components': resolve('src/window/components'),
  '@store': resolve('src/window/store'),
  '@views': resolve('src/window/views')
}
