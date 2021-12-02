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

    // module: { 
    //   rules: [ 
    //     { 
    //       test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, 
    //       loader: 'file-loader' 
    //     } 
    //   ] 
    // },
    // css: {
    //   loaderOptions: {
    //     sass: {
    //       data: `
    //         @import "@/assets/scss/reset.scss";
    //         @import "@/assets/scss/fonts.scss";
    //       `
    //     }
    //   }
    // }
}