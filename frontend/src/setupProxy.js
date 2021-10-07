const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const proxy = createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
    xfwd: true,
  });
  app.use('/api', proxy);
  app.use('/auth', proxy);
};
