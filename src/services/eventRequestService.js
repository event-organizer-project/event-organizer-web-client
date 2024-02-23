import axios from 'axios'
import RequestService from './requestService'

export class EventRequestService extends RequestService {
    constructor() {
        super('event')
    }

    get = (id, onError) => 
        this.baseGet(id, event => ({
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
        }), onError)

    schedule = (id, isScheduled, onSuccess, onError) =>
        this.handleRequest(axios.get(`${this.resourceName}/schedule/${id}/${isScheduled}`), onSuccess, onError)

    getOwnEvents = (onSuccess, onError) =>
        this.handleRequest(axios.get(`${this.resourceName}/own-events`), onSuccess, onError)
}

const eventRequestService = new EventRequestService()

export default eventRequestService
