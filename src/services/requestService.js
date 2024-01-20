import axios from 'axios'
import { startLoading, finishLoading, setError } from 'store/generalSlice'
import store from 'store/store';

export default class RequestService {

    constructor(resourceName) {
        this.resourceName = `${process.env.REACT_APP_WEB_API_URL}/${resourceName}`;
    }

    get = (id) => {
        store.dispatch(startLoading());
        
        return axios
            .get(`${this.resourceName}/${id}`)
            .then(response => {
                const event = response.data;
                return {...event, startDate: new Date(event.startDate), endDate: new Date(event.endDate) };
            })
            .catch(error => {
                console.log('Error:', error);
                store.dispatch(setError(error.response.statusText));
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }

    getAll = (top, skip) => {
        store.dispatch(startLoading());

        return axios
            .get(`${this.resourceName}/all?top=${top}&skip=${skip}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('Error:', error);
                store.dispatch(setError(error.response.statusText));
                return null;
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }

    getList = (criteria) => {
        store.dispatch(startLoading());

        return axios
            .post(`${this.resourceName}/list`, criteria)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('Error:', error);
                store.dispatch(setError(error.response.statusText));
                return null;
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }

    post(payload) {
        store.dispatch(startLoading());

        return axios
            .post(this.resourceName, payload)
            .then(response => {
                return response.data
            })
            .catch(error => {
                store.dispatch(setError(error.response.statusText));
                return null;
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }

    put(payload) {
        store.dispatch(startLoading());

        return axios
            .put(this.resourceName, payload)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log('Error:', error);
                store.dispatch(setError(error.response.statusText));
                return null;
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }

    delete(id) {
        store.dispatch(startLoading());

        return axios
            .delete(`${this.resourceName}/${id}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log('Error:', error);
                store.dispatch(setError(error.response.statusText));
                return null;
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }
}
