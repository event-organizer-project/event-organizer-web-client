import dayjs from 'dayjs';

export default class DateFormatter {

    getDay = (date) => {
        const parsedDate = dayjs(date);
        const formattedDate = parsedDate.format('DD.MM');

        return formattedDate;
    }

    getTime = (date) => {
        const formattedTime = date.slice(0, 5);;

        return formattedTime;
    }
}

export const useDateFormatter = () => new DateFormatter();