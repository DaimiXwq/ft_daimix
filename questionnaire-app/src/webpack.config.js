const path = require('path');

module.exports = {
  devServer: {
    allowedHosts: 'all',  // Разрешить все хосты
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
};
