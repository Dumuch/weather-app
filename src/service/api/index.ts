import axios from 'axios';
import type { AxiosInstance } from "axios";
export class Api {
    private readonly baseUrl: string;
    private request: AxiosInstance;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
        this.request = this.createRequest();
    }

    recreateRequests() {
        this.request = this.createRequest();
    }

    private createRequest() {
        return axios.create({
            baseURL: this.baseUrl,
            timeout: 90000,
        });
    }

    getRequest() {
        return this.request;
    }

    get(method: string, params: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            this.request
                .get(method, { params })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        reject(error.response.data);
                    } else if (error.request) {
                        reject({ error_code: 0, error_message: 'Unknown error' });
                    }
                });
        });
    }
}
