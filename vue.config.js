const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false //解决组件名 单个单词报错 的问题
  //配置跨域
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       //将8080改成3000
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     }
  //   }
  // }
})
