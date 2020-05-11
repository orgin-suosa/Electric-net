// import { fail } from 'assert';

// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/tpdwt_web/": {
        // target: 'http://10.1.117.3:8001', // 你接口的域名
        // target: 'http://10.7.169.77:8090', // 你接口的域名杨雅阁
        // target: "http://10.7.169.92:8090", // 你接口的域名陈超
        target: 'http://10.7.169.72:8090',// 你接口的域名cao
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/tpdwt_web": "/tpdwt_web"
        }
      }
      // '/tpdwt_web/toGetClient.html': {
      //   target: 'http://10.7.181.159:8090/tpdwt_web/toGetClient.html', // 你接口的域名
      //   secure: false,
      //   changeOrigin: true,
      // pathRewrite: {
      //   '^/tpdwt_web/toGetClient.html': '/tpdwt_web/toGetClient.html'
      // }
      // }
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 2002, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/tpdwt_web/dist/",
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};

// 'use strict'
// // Template version: 1.1.3
// // see http://vuejs-templates.github.io/webpack for documentation.

// const path = require('path')

// module.exports = {
//   build: {
//     env: require('./prod.env'),
//     index: path.resolve(__dirname, '../dist/index.html'),
//     assetsRoot: path.resolve(__dirname, '../dist'),
//     assetsSubDirectory: 'static',
//     assetsPublicPath: 'http://10.1.117.3:8001/tpdwt_manager/dist/',
//     productionSourceMap: true,
//     // Gzip off by default as many popular static hosts such as
//     // Surge or Netlify already gzip all static assets for you.
//     // Before setting to `true`, make sure to:
//     // npm install --save-dev compression-webpack-plugin
//     productionGzip: false,
//     productionGzipExtensions: ['js', 'css'],
//     // Run the build command with an extra argument to
//     // View the bundle analyzer report after build finishes:
//     // `npm run build --report`
//     // Set to `true` or `false` to always turn it on or off
//     bundleAnalyzerReport: process.env.npm_config_report
//   },
//   dev: {
//     env: require('./dev.env'),
//     port: process.env.PORT || 2002,
//     autoOpenBrowser: true,
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {
//       '/tpdwt_manager/': {
//         target: 'http://10.7.181.153:8090', // 你接口的域名
//         secure: false,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/tpdwt_manager': '/tpdwt_manager'
//         }
//       },
//     },
//     // CSS Sourcemaps off by default because relative paths are "buggy"
//     // with this option, according to the CSS-Loader README
//     // (https://github.com/webpack/css-loader#sourcemaps)
//     // In our experience, they generally work as expected,
//     // just be aware of this issue when enabling this option.
//     cssSourceMap: false
//   }
// }
