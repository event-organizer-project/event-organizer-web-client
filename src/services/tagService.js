import axios from 'axios';
import { setupCache  } from 'axios-cache-interceptor';
import { startLoading, finishLoading, setError } from 'store/generalSlice'
import store from 'store/store';

export class TagService {

    resourceName = `${process.env.REACT_APP_WEB_API_URL}/tag`;
    
    api = axios.create();

    // Set up caching for only one specific endpoint
    cache = setupCache(this.api, {
      maxAge: 15 * 60 * 1000, // Cache for 15 minutes
      exclude: {
        paths: [this.resourceName],
      },
    });

    getALL = () => {
        store.dispatch(startLoading());

        return this.cache
            .get(this.resourceName)
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
