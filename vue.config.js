// vue.config.js
const TerserPlugin = require('terser-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const cdn = {
  externals: {
    'element-ui': 'ELEMENT',
    vue: 'Vue',
    dayjs: 'dayjs'
  },
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/index.min.js',
    'https://cdn.jsdelivr.net/npm/dayjs@1.10.6/dayjs.min.js'
  ],
  css: [
    'https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/theme-chalk/index.css'
  ]
}

const config = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    // 这个代理只仅针对本地开发服务（yarn serve）
    proxy: {
      '/api/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true, // 把请求头中的 host 配置为 target
        pathRewrite: {
          '^/api/': ''
        }
      },
      '/api/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  },
  chainWebpack: config => {
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    }
  }
}

if (isProd) {
  config.configureWebpack.externals = cdn.externals
  config.productionSourceMap = false
}

module.exports = config
