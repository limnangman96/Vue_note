import moment from 'moment';
// @TODO 이거 뿌시자

export const todayMixin = {
    data() {
        return {
            year: null,
            month: null,
            getMoment: function() {},
        }
    },
    created() {
        this.year = moment().format("YYYY");
        this.month = moment().format("MM");
        this.getMoment = moment();
    },
}