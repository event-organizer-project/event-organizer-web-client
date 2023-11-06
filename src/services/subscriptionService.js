import axios from 'axios';
import { startLoading, finishLoading, setError } from 'store/generalSlice'
import store from 'store/store';

export class SubscriptionService {

  resourceName = `${process.env.REACT_APP_WEB_API_URL}/subscription`;

  getPublicKey = () => {
    return process.env.REACT_APP_PUSH_PUBLIC_KEY;
  }

  storeSubscription(payload) {
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

const subscriptionService = new SubscriptionService();

export default subscriptionService;
