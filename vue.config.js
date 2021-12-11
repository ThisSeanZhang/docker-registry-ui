module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/test/': {
        target: 'https://registry.w-w.cyou/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/test': '',
        },
      },
    },
  },
};