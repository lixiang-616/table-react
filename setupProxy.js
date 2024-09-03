
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'https://api.apiopen.top',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })

    // '/api',
    // createProxyMiddleware({
    //   target: 'https://api.apiopen.top', //代理的地址
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': ''  // 将请求路径中的 "/api" 替换为 ""
    //   }
    // })
  )
};
