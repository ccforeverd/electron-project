
const merge = require('webpack-merge')
const alias = require('./alias')

module.exports = config => {
  const styleRules = config.module.rules.filter(rule =>
    rule.test.toString().match(/css|less|s\(\[ac\]\)ss/)
  )

  styleRules.forEach(rule => {
    const cssLoader = rule.use.find(use => use.loader === 'css-loader')
    // this is the actual modification we make:
    cssLoader.options.modules = 'local'
  })

  return merge.smart(config, {
    resolve: {
      alias
    }
  })
}
