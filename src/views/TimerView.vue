<template>
    <div class="timer">
      <section class="timer__wrapper">
        <!-- 타임 존 -->
        <div class="timer__timeZone">
            <div class="timer__timeZone__inner">
                <!-- 시간 설정 -->
                <label v-if="true" class="timer__timeZone__label">
                  <input type="text" @keyup="timeLimit($event)" :value="test" class="timer__timeZone__input" maxlength="2" placeholder="0">
                </label>

                <!-- 시간 보여주기 -->
                <span v-else class="timer__timeZone__time">48:51</span>
            </div>
        </div>

        <!-- 버튼 영역 -->
        <div class="timer__buttonWrap">
          <!-- 시작 -->
          <label class="timer__buttonWrap__label timer__buttonWrap__start">
            <input type="radio" name="controller">
            <font-awesome-icon icon="play" class="start__icon"></font-awesome-icon>
          </label>

          <!-- 일시정지 -->
          <label class="timer__buttonWrap__label timer__buttonWrap__pause">
            <input type="radio" name="controller">
            <font-awesome-icon icon="pause" class="pause__icon"></font-awesome-icon>
          </label>

          <!-- 리셋 -->
          <label class="timer__buttonWrap__label timer__buttonWrap__reset">
            <input type="radio" name="controller">
            <font-awesome-icon icon="power-off" class="reset__icon"></font-awesome-icon>
          </label>
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
    > 시간 뿌려준다. (도넛차트에) TODO
    > 시간이 카운트다운 된다. 

  멈춤버튼 누른다 
 */