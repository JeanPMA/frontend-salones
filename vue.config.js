const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@fortawesome/fontawesome-svg-core': '@fortawesome/fontawesome-svg-core',
        '@fortawesome/vue-fontawesome': '@fortawesome/vue-fontawesome',
        '@fortawesome/free-solid-svg-icons': '@fortawesome/free-solid-svg-icons',
      },
    },
  },
})
