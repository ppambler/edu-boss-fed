// vue.config.js
module.exports = {
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
  }
}
