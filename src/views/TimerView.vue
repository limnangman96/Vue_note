<template>
    <div>
        타이머

        <label>
            테스트 라벨 
            <input type="text" v-model="testData">
        </label>
    </div>
</template>
<script>
export default {
    data() {
        return {
            testData: "",
        }
    },

    // 출처 https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4

    /*
        1. creation 
            컴포넌트 초기화 단계
            컴포넌트가 돔에 추가되기 전 실행
            서버렌더링에서 지원되는 훅
            클라이언트단과 서버단 렌더링 모두에서 처리해야할 일을 하기 좋은 시간
            돔에 접근하거나 this.$el 사용불가
    */
    beforeCreate() {
      console.log("beforeCreate");
      // 가장먼저 실행되는 훅 
      // data와 events(vm.$on, vm.$once, vm.$off, vm.$emit)가 세팅되지 않은 시점 (접근 불가)
    },
    created() {
      console.log("created");
      // data, events 화성화 > 접근 가능
      // 구성 요소의 데이터를 가져오고 데이터를 조작하기 좋은 시간
      // 템플릿과 가상돔은 마운트 및 렌더링되지 않은 상태
      // *** 부모 > 자식 순으로 실행
    },

    /*
        2. mounting
            DOM 삽입 단계
            초기 렌더링 직전에 컴포넌트에 직접 접근할 수 있다.
            서버렌더링에서는 지원하지 않는다.
            (컴포넌트 초기에 세팅되어야할 데이터 패치는 created 단계를 사용하는 것이 낫다.)
    */
    beforeMount() {
      console.log("beforeMount");
      // 템플릿이 있는지 확인하고 렌더링하지만 아직 표시되지 않는다.
      // el 옵션이 있는지 확인하고 렌더링한다. (vue가 실행될 HTML의 DOM 요소를 지정 # . id class 지정)
      // 템플릿과 렌더 함수들이 컴파일된 후에 첫 렌더링이 일어나기 직전에 실행된다. 
      // 하위 구성 요소에서 가져온 데이터를 조작하기에 좋은 시간
    },
    mounted() {
      console.log("mounted");
      // 템플릿이 렌더되고, 실제 DOM이 보여진다.
      // 컴포넌트, 템플릿, 렌더링 된 돔에 접근가능 
      // 여기서 데이터를 조작하면 그려진 view에 영향을 미친다. 
      // *** 자식 > 부모 순으로 실행
    },

    /*
        3. updating
            Diff 및 재 렌더링 단계
            컴포넌트에서 사용되는 반응형 속성들이 변경되거나 어떤 이유로 재 렌더링이 발생되면 실행된다. 
            디버깅이나 프로파일링 등을 위해 컴포넌트 재 렌더링 시점을 알고싶을때 사용하면 된다.
    */
    beforeUpdate() {
      console.log("beforeUpdate");
      // 구성요소가 업데이트되기 직전에 일어난다. (돔이 재 렌더링되고 패치되기 직전에 실행)
      // 변경 전 상태를 디버깅하기에 좋은시간
    },
    // 업데이트가 일어난다.
    updated() {
      console.log("updated");
      // 컴포넌트의 데이터가 변하여 재렌더링이 일어난 후에 실행
      // 업데이트 완료된 상태이므로 돔 종속적인 연산을 할 수 있다. 
      // 모든 자식 컴포넌트의 재렌더링 상태를 보장하지는 않는다.   
      // 변경된 내용을 디버깅하기 좋은시간
    },

    /*
        4. Destruction 
            해체단계
    */
    beforeDestroy() {
      console.log("beforeDestroy");
      // 마운트 해체 전 구성요소
      // 원래 모습과 모든 기능들을 그대로 가지고 있다. 이벤트 리스너를 제거하거나 reative subscription을 제거하고자 한다면 이 훅이 제격이다.
    },
    destroyed() {
      console.log("destroyed");
      // 뷰인스턴스 제거된 후 호출된다. 
      // 뷰인스턴스의 모든 디렉티브가 바인딩 해제되고 모든 이벤트 리스너가 제거되며 모든 하위 vue 인스턴스도 삭제된다.    
    }
}
</script>



/**
    ✔ 모든 라이프사이클 훅은 자동으로 this 컨텍스트가 인스턴스에 바인딩되어 있으므로, data, computed 및 methods 속성에 접근할 수 있습니다. 즉, 화살표 함수를 사용해서 라이프사이클 메소드를 정의하면 안됩니다.

    - Vue2 라이프사이클

        beforeCreate
        created
        beforeMount
        mounted
        beforeUpdate
        updated
        beforeDestroy
        destroyed

    *** 라이프사이클 훅에 접두사 "on"을 추가함으로서 컴포넌트의 라이프사이클 훅에 접근할 수 있다.

        단, etup은 beforeCreate, created 라이프사이클 훅 사이에 실행되는 시점이므로 명시적으로 정의할 필요가 없으며, 이 함수는 컴포넌트에 의해 훅이 호출될 때, 실행될 콜백을 받는다.

        setup() {
            noMounted(() => {
                console.log("컴포넌트가 mounted 되었습니다!");
            })
        }

                    

    - Vue3 (새로 생성된 라이프사이클) // @TODO 공부필요

        activated
        deactivated
        beforeUnmount
        ummounted
        errorCaptured
        renderTracked
        rederTrigered

         *** keep=alive (https://velog.io/@kyusung/VUE-keep-alive  https://v3.ko.vuejs.org/api/options-lifecycle-hooks.html#updated)
            컴포넌트 상태를 보존할 때 사용한다. 

            props :  
                - include
 */