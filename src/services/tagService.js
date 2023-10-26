import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { startLoading, finishLoading, setError } from 'store/generalSlice'
import store from 'store/store';

export class TagService {

    resourceName = `${process.env.REACT_APP_WEB_API_URL}/tag`;
    
    axios = setupCache(Axios); 

    getALL = () => {
        store.dispatch(startLoading());

        return this.axios
            .get(`${this.resourceName}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                store.dispatch(setError(error.response.statusText));
            })
            .finally(() => {
                store.dispatch(finishLoading());
            });
    }
}

const tagService = new TagService();

export default tagService;
