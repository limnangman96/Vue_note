import moment from 'moment';

export const todayMixin = {
    mounted() {
        const year = moment().format("YYYY");
        const month = moment().format("MM");
        const date = moment().format("DD");
        const dayArr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = dayArr[moment().day()] //요일

        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
        this.monthText = monthArr[month - 1]; //배열이라 index가 0부터
    }
}