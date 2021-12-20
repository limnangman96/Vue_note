import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoListView from '../views/TodoListView';
import CalendarView from '../views/CalendarView';
import TimerView from '../views/TimerView';
import WeatherView from '../views/WeatherView';
import { bus } from '../util/bus.js';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/todolist",
        },
        {
            name: "TODOLIST",
            path: "/todolist",
            component: TodoListView,
            // meta: {authRequired: true}
        },
        {
            name: "CALENDAR",
            path: "/calendar",
            component: CalendarView,
        },
        {
            name: "TIMER",
            path: "/timer",
            component: TimerView,
        },
        {
            name: "WEATHER",
            path: "/weather",
            component: WeatherView,
        },
    ]
});

router.afterEach(() => {
    bus.$emit("menu:close");
});

// (테스트)
router.beforeEach(function(to, from, next) {
    if(to.matched.some(function(routerInfo) {
        return routerInfo.meta.authRequired;
    })) {
        // 인증정보가 필요한 case > 경고창은 띄우고 페이지 전환은 하지 않음
        // console.log("인증정보가 필요한 case");
    } else {
        // 인증정보가 필요하지 않은 case > 페이지 전환 없음
        // console.log("인증정보가 필요하지 않은 case");
        next();
    }
});