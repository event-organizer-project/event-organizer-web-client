import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'
import BaseRequestService from './baseRequestService'

export class TagService extends BaseRequestService {
    constructor() {
        super('tag')
    }

    api = axios.create()

    // Set up caching for only one specific endpoint
    cache = setupCache(this.api, {
        maxAge: 15 * 60 * 1000, // Cache for 15 minutes
        exclude: {
            paths: [this.resourceName],
        },
    })

    getALL = (onSuccess, onError) =>
    this.handleRequest(
        this.cache.get(this.resourceName),
        onSuccess,
        onError
    )
}

const tagService = new TagService()

export default tagService
