const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "querystring": require.resolve("querystring-es3"),
          "url": require.resolve("url/"),
          "fs": false,
          "path": false
        }
      }
    }
  }
};
