<template lang="">
    <div>
        <div class="calendar__inner">
            <div class="calendar__top">
                <span href="#" v-for="item in day" class="calendar__item">
                    {{ item }}
                </span>
            </div>
            
            <div class="calendar__cont">
                <a href="#" v-for="item in thisDate" class="calendar__item calendar__date js__calendar__date" @click="dateClick">
                    {{ item }}
                </a>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
    data() {
        return {
            day: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            thisDate: [],
        }
    },
    methods: {
        dateClick(e) {
           e.target.classList.add("active");
            //@TODO 메모 영역 보여주기 
        },
    },
    created() {
        // @TODO 스크립트 정리하기
        // @TODO 조건문에 따라 클래스를 추가해줄수 있지 않을까? (v-for 돌릴때)

        // 연도, 월 구하기
        const today = new Date;
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        // 지난 달 마지막 날짜/요일
        const prevLast = new Date(year, month, 0);
        const prevLastDate = prevLast.getDate();
        const prevLastDay = prevLast.getDay();

        // 이번 달 마지막 날짜/요일
        const thisLast = new Date(year, month + 1, 0);
        let thisLastDate = thisLast.getDate();
        const thisLastDay = thisLast.getDay();

        // 알력: 이번달 날짜배열
        const thisDate = []

        // 알력: 이번달 날짜(숫자) 구하기
        for( let i=1; i <= thisLastDate; i++) {
            thisDate.push(i);
        }

        const oriThisDate = thisDate.slice()

        // 알력: 지난달 날짜(숫자) 구하기
        if (prevLastDay != 6) { //지난달 끝나는 요일이 토요일이 아니다.
            for(let i=0; i<=prevLastDay + 1; i++) { 
                thisDate.unshift(thisLastDate);
                thisLastDate = thisLastDate - 1
            }   
        } 

        // 알력: 다음달 날짜(숫자) 구하기
        if (thisLastDay != 6){ //이번달 끝나는 요일이 토요일이 아니다
            for(let i=0; i<=thisLastDay; i++) {
                thisDate.push(i + 1);
                i + 1 + 1;
            } 
        }

        // 일력 뽑은 것 data에 넣기
        this.thisDate = thisDate;

        // 이번달 숫자 아닌것 골라내기
        let excludeArrIndex = []
        let target = "";

        for(let i = 0; i < thisDate.length; i++ ) {
            if (thisDate[i + 1] - thisDate[i] < 0) {
                excludeArrIndex.push(i);
            }
        }

        // @TODO setTimeout 쓰지 말기
        setTimeout(function() {
            // 저번달 숫자 갯수 알아내는 중
            for(let i = excludeArrIndex[0]; i >= 0; i--) {
                target = document.querySelectorAll(".js__calendar__date")[i];
                target.classList.add("notThisMonth");
            }

            // 다음달 숫자 갯수 알아내는 중
            for(let i = excludeArrIndex[1] + 1; i < thisDate.length; i++) {
                target = document.querySelectorAll(".js__calendar__date")[i];
                target.classList.add("notThisMonth");
            }

            // 오늘날짜 표시하기
            document.querySelectorAll(".js__calendar__date:not(.notThisMonth)")[day - 1].classList.add("today");
        }, 300)

        
    }
}
</script>
<style lang="scss">
    .calendar {
        &__inner {
            width: 350px;
        }

        &__item {
            display: inline-block;
            width: 50px;
            height: 50px;
            padding: 15px 0;
            color: #b9b9b9;
            font-size: 18px;
            line-height: 20px;
            text-align: center;
            box-sizing: border-box;
        }

        &__date {
            position: relative;
            color: #575757;

            &.notThisMonth {
                pointer-events: none;
                cursor: default;
                opacity: .2;
            }

            &.active {
                color: #fff;

                &:before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: -1;
                    width: 80%;
                    height: 80%;
                    background: #50e3a4;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                } 
            }

            &.today {
                &:before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 80%;
                    height: 80%;
                    border: 2px solid #50e3a4;;
                    border-radius: 50%;
                    box-sizing: border-box;
                    transform: translate(-50%, -50%);
                }   
            }
        }
    }
</style>