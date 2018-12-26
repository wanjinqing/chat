// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const webpack = require('webpack');
// console.log(webpack)
// https://www.npmjs.com/package/uglifyjs-webpack-plugin


module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 开发环境
  lintOnSave: true,
  // 生产环境
  indexPath: 'index.html',
  filenameHashing: true,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,

  runtimeCompiler: true,

  // devServer: {
  //   proxy: {
  //     '/json': {
  //       target: 'http://127.0.0.1:3000',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/json': '/json'
  //       }
  //     }
  //   }
  // }
  
  // error: sockjs-node/info
  // devServer: {
  //   public: 'wangjq.renrenying.top'
  // },
  // devServer: {
  //   disableHostCheck: true,
  //   public: '1882y0f636.51mypc.cn'
  // }
}

// optimization: {
//   checkWasmTypes,
//   chunkIds,
//   concatenateModules,
//   flagIncludedChunks,
//   hashedModuleIds,
//   mangleWasmImports,
//   mergeDuplicateChunks,
//   minimize,
//   minimizer,
//   moduleIds,
//   namedChunks,
//   namedModules,
//   noEmitOnErrors,
//   nodeEnv,
//   occurrenceOrder,
//   portableRecords,
//   providedExports,
//   removeAvailableModules,
//   removeEmptyChunks,
//   runtimeChunk,
//   sideEffects,
//   splitChunks,
//   usedExports 
// }