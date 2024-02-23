import { startLoading, finishLoading, setError } from 'store/generalSlice'
import store from 'store/store'

export default class BaseRequestService {
    constructor(resourceName) {
        this.resourceName = `${process.env.REACT_APP_WEB_API_URL}/${resourceName}`
    }

    handleRequest(request, onSuccess, onError) {
        store.dispatch(startLoading())
    
        return request
            .then(response => {
                return onSuccess ? onSuccess(response.data) : response.data
            })
            .catch(error => {
                store.dispatch(setError(this.getErrorText(error)))
                if (onError) onError()
            })
            .finally(() => {
                store.dispatch(finishLoading())
            })
    }

    getErrorText(httpError) {
        if (!httpError) return 'Something went wrong'
    
        if (typeof httpError.response?.data === 'string') return httpError.response.data
    
        if (!!httpError.message) return httpError.message
    
        return 'Something went wrong'
    }
}
