const webpack = require("webpack");
module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        //环境变量
        "process.env": {
        }
      })
    ]
  },
  productionSourceMap: true,

  lintOnSave: true,
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      "/local": {
        target: "https://localhost/",
        changeOrigin: true,
        pathRewrite: {
          "^/local": ""
        },
        cookieDomainRewrite: {
          "unchanged.domain": "unchanged.domain",
          "old.domain": "new.domain",
          "*": ""
        }
      }
    }
  }
};
