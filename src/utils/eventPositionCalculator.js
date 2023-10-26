export default class EventPositionCalculator {

    scale = 1440;

    tags = [];
    filter = '';

    calculatePosition = (event) => {
        const startTime = event.startTime.split(':');
        const startTimeInMinutes = +startTime[0] * 60 + +startTime[1];

        const endTime = event.endTime.split(':');
        const endTimeInMinutes = 1440 - (+endTime[0] * 60 + +endTime[1]);

        return {
            top: this.calculatePercentageValue(startTimeInMinutes) + '%',
            bottom: this.calculatePercentageValue(endTimeInMinutes) + '%'
        };
    }

    calculatePercentageValue = (value) => value * 100 / this.scale;
}