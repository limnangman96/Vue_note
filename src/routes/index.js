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
            name: "TODOLIST",
            path: "/todolist",
            component: TodoListView,
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
        }
    ]
})