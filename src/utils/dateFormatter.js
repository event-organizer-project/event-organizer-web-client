import dayjs from 'dayjs';

export default class DateFormatter {

    getDay = date => dayjs(date).format('DD.MM');

    getDayFullFormat = date => dayjs(date).format('DD/MM/YYYY');

    getTime = date => dayjs(date).format('HH:mm')

    getMonthWithYear = date => dayjs(date).format('MMMM YY');

    getMonthNumber = date => dayjs(date).month();
}

export const useDateFormatter = () => new DateFormatter();