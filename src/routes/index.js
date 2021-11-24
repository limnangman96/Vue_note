import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoListView from '../views/TodoListView';
import CalendarView from '../views/CalendarView';
import TimerView from '../views/TimerView';
import WeatherView from '../views/WeatherView';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/todolist",
        },
        {
            path: "/todolist",
            component: TodoListView,
        },
        {
            path: "/calendar",
            component: CalendarView,
        },
        {
            path: "/timer",
            component: TimerView,
        }
        ,
        {
            path: "/weather",
            component: WeatherView,
        }
    ]
})