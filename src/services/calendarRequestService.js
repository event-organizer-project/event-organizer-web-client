import axios from 'axios'
import RequestService from './requestService'
import { startLoading, finishLoading, setError } from 'store/generalSlice'
import store from 'store/store';

export class CalendarRequestService extends RequestService {

    constructor() {
        super('calendar');
    }

    get = (offset = 0) => {
        store.dispatch(startLoading());
        
        return axios
            .get(`${this.resourceName}/${offset}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('Error:', error);
                store.dispatch(setError(error.response.statusText));
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }
}

const calendarRequestService = new CalendarRequestService();

export default calendarRequestService;
