// vue 설정파일
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Bundle 분석 플러그인

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins: [new BundleAnalyzerPlugin()],
        resolve: {
          alias: {
            moment: 'moment/src/moment' //moment 용량 줄이기
          }
        }
      }
}