import axios, {AxiosInstance} from "axios";
import {io, Socket} from "socket.io-client";
import ApiService from "../api/apiService";

export default class skconfig{
    socketio: any;
    constructor() {
        this.socketio = io("http://127.0.0.1:8080/",{withCredentials:true})
    }
}