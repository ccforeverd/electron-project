
const merge = require('webpack-merge')
const alias = require('./alias')

module.exports = config => {
  return merge.smart(config, {
    resolve: {
      alias
    }
  })
}
