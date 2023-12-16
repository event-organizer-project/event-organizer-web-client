import dayjs from 'dayjs';

export default class DateFormatter {

    getDay = date => dayjs(date).format('DD.MM');

    getTime = date => date.slice(0, 5)

    getMonthWithYear = date => dayjs(date).format('MMMM YY');

    getMonthNumber = date => dayjs(date).month();
}

export const useDateFormatter = () => new DateFormatter();