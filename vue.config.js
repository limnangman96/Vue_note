// vue 설정파일
module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            scss: {
                // 출처 https://m.blog.naver.com/mgveg/221900939600
                // additionalData: `@import "~@/assets/scss/fonts.scss";`
            }
        }
    }
    // scss로더 글로벌 설정 https://yilpe93.github.io/vue/vue-set-scss/
    // 로컬폰트 적용 시 변환 https://www.catagec.com/blog/loading-local-fonts-with-vue-cli-4/
}