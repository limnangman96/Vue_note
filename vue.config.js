// vue 구성/설정 파일
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
    },
    css: {
      loaderOptions: { //vue-loader 의 내부 구성을 변경하는데 사용할 수 있는 css 옵션
        sass: {
          data: `@import "@/assets/scss/app.scss";`
        },
      }
  }
}