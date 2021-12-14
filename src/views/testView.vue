<template>
    <div>
        <h2>main.js에서 전역으로 선언한 test 컴포넌트 입니다.</h2>

        <label>
            <input type="checkbox" @change="checkEvnet()" :checked="checkedVal">
        </label>

        <label>
            <input type="text" v-focus>
        </label>

        <p v-demo="1 + 1">커스텀 디렉티브 테스트</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            booleanValue: false,
            checkedVal: false,
        }
    },
    // Vue API (2) directive 사용자 정의 디렉티브 > 로컬
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        },
        demo: {
            bind: function(el, binding, vnode) {
                let s = JSON.stringify
                el.innerHTML = 
                'name: ' + s(binding.name) + "<br>" +
                'value: ' + s(binding.value) + "<br>" +
                'expression: ' + s(binding.expression) + "<br>" +
                'argument: ' + s(binding.argument) + "<br>" +
                'modifiers: ' + s(binding.modifiers) + "<br>" +
                'vnode key: ' + Object.keys(vnode).join(". ");
            }
        }   
    },
    methods: {
        checkEvnet() {
            //input에서 t/f 값 컨트롤하고 싶을때 어떻게 써야 하는지? 
            // 1. $event.target.value 쓴다.
            // this.booleanValue = $event.target.checked;

            // 2. :checked 속성을 이용한다.
            this.checkedVal = !this.checkedVal;
        },
    }
}
</script>

<style>

</style>