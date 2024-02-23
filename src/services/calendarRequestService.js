import axios from 'axios'
import BaseRequestService from './baseRequestService'

export class CalendarRequestService extends BaseRequestService {
    constructor() {
        super('calendar')
    }

    get = (offset = 0, onSuccess, onError) =>
        this.handleRequest(
            axios.get(`${this.resourceName}/${offset}`, {
                headers: { TimeZoneOffset: -new Date().getTimezoneOffset() },
            }),
            onSuccess,
            onError
        )
}

const calendarRequestService = new CalendarRequestService()

export default calendarRequestService
