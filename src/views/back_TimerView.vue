<template>
    <div class="timer">
      <section class="timer__wrapper">
        <div class="timer__timeZone">
            <span class="timer__timeZone__inner">
                <label v-if="false" class="timer__timeZone__label">
                  <input type="text" @keyup="timeLimit($event)" :value="test" class="timer__timeZone__input" maxlength="2" placeholder="0">
                </label>

                <!-- 최대 1시간 설정 가능 -->
                <span v-else class="timer__timeZone__time">48:51</span>
            </span>
        </div>

        <div class="timer__buttonWrap">
            <button class="timer__buttonWrap__cancel"></button>

            <button type="button" v-if="notplaying" @click="timerStart()" class="timer__buttonWrap__start">play</button>
            <button type="button" v-else @click="timerPause()" class="timer__buttonWrap__pause">pause</button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
    data() {
        return {
          inputNum: "",
          notplaying: true,
        }
    },
    computed: {
        test() {
          if(this.inputNum > 60) {
            alert("시간은 최대 60분까지 설정 가능합니다.");
            return "";
          }
          return this.inputNum;
        },
    },
    // Vue API (2) directive 사용자 정의 디렉티브 > 로컬
    // directives: {
        // focus: {
        //     inserted: function(el) {
        //         el.focus();
        //     }
        // },
    // },
    methods: {
      timerStart() {
        this.notplaying = false;
      },
      timerPause() {
        this.notplaying = true;
      },
      timeLimit($event) {
        this.inputNum = $event.target.value;
      }
    }
}
</script>

/*
  진입 
  시간 입력한다
  플레이버튼 누른다 
    > 멈춤 버튼으로 바뀐다. 
    > input hidden span show 
    > 시간 뿌려준다. (도넛차트에)
    > 시간이 카운트다운 된다. 

  멈춤버튼 누른다 
 */