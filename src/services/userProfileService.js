import axios from 'axios'
import { startLoading, finishLoading, setError } from '../store/generalSlice'
import store from '../store/store';

export default class userProfileService {

    resourceName = `${process.env.REACT_APP_WEB_API_URL}/userprofile`;

    getCurrentUserProfile = () => {
        store.dispatch(startLoading());
        
        return axios
            .get(`${this.resourceName}/current`)
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
