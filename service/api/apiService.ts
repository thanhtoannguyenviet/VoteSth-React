import axios, {AxiosInstance} from "axios";

export default class ApiService{
    service: AxiosInstance;
    constructor() {
        this.service = axios.create({
            baseURL:"http://127.0.0.1:8080/v1/"
        })
    }
}