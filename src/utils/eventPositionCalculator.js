import { useDateFormatter } from 'utils/dateFormatter'

export default class EventPositionCalculator {

    dateFormatter = useDateFormatter();

    scale = 1440;

    calculatePosition = (event) => {
        const startTime = this.dateFormatter.getTime(event.startDate).split(':');
        const startTimeInMinutes = +startTime[0] * 60 + +startTime[1];

        const endTime = this.dateFormatter.getTime(event.endDate).split(':');
        const endTimeInMinutes = 1440 - (+endTime[0] * 60 + +endTime[1]);

        return {
            top: this.calculatePercentageValue(startTimeInMinutes) + '%',
            bottom: this.calculatePercentageValue(endTimeInMinutes) + '%'
        };
    }

    calculatePercentageValue = (value) => value * 100 / this.scale;
}