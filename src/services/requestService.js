import axios from 'axios'
import BaseRequestService from './baseRequestService'


export default class RequestService extends BaseRequestService{
    constructor(resourceName) {
        super(resourceName)
    }

    baseGet = (id, onSuccess, onError) => this.handleRequest(
        axios.get(`${this.resourceName}/${id}`),
        onSuccess,
        onError
    )
    
    getAll = (top, skip, onSuccess, onError) => this.handleRequest(
        axios.get(`${this.resourceName}/all?top=${top}&skip=${skip}`),
        onSuccess,
        onError
    )

    getList = (criteria, onSuccess, onError) => this.handleRequest(
        axios.post(`${this.resourceName}/list`, criteria),
        onSuccess,
        onError
    )
    
    post = (payload, onSuccess, onError) => this.handleRequest(
        axios.post(this.resourceName, payload),
        onSuccess,
        onError
    )

    put = (payload, onSuccess, onError) => this.handleRequest(
        axios.put(this.resourceName, payload),
        onSuccess,
        onError
    )

    delete = (id, onSuccess, onError) => this.handleRequest(
        axios.delete(`${this.resourceName}/${id}`),
        onSuccess,
        onError
    )
}
