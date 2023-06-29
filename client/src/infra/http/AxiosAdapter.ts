import axios from "axios";
import { Router } from "vue-router";
import { HttpClient } from "./HttpClient";

export class AxiosAdapter implements HttpClient {
    constructor(readonly router: Router) {
        axios.interceptors.request.use((config: any) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        });
        
        axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    this.router.push("/login");
                }
                return Promise.reject(error);
            }
        );
    }

    async get(url: string): Promise<any> {
        const response = await axios({
            url,
            method: "get"
        });
        return response.data;
    }

    async post(url: string, body: any): Promise<any> {
        const response = await axios({
            url: url,
            method: "post",
            data: body
        });
        return response.data;
    }

    async put(url: string, data: any): Promise<any> {
        const response = await axios({
            url,
            method: "put",
            data
        });
        return response.data;
    }

    async delete(url: string): Promise<any> {
        const response = await axios({
            url,
            method: "delete"
        });
        return response.data;
    }
}