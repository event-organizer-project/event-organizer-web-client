import axios from 'axios'
import BaseRequestService from './baseRequestService'

export default class UserProfileService extends BaseRequestService {
    constructor() {
        super('userprofile')
    }

    getCurrentUserProfile = (onSuccess, onError) =>
        this.handleRequest(
            axios.get(`${this.resourceName}/current`),
            onSuccess,
            onError
        )
}
