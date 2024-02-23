import axios from 'axios'
import BaseRequestService from './baseRequestService'

export class SubscriptionService extends BaseRequestService {
    constructor() {
        super('subscription')
    }

    getPublicKey = () => {
        return process.env.REACT_APP_PUSH_PUBLIC_KEY
    }

    storeSubscription = (payload, onSuccess, onError) =>
        this.handleRequest(
            axios.post(this.resourceName, payload),
            onSuccess,
            onError
        )
    
    /*
    discardSubscription(payload) {
    store.dispatch(startLoading());

    return axios
        .delete(this.resourceName, payload)
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
  }*/
}

const subscriptionService = new SubscriptionService()

export default subscriptionService
