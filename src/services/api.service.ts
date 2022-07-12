import { Injectable } from "@nestjs/common";
import axios, { Method } from "axios";

type Headers = { [P: string]: string };

@Injectable()
export class ApiService {
    constructor() {}

    private async request<T>(method: Method, url: string, data?: any, headers?: Headers, timeout?: number) {
        const res = await axios.request<T>({
            method: method,
            url: url,
            data: data,
            headers: headers,
            timeout: timeout || 60000,
        });
        return res.data;
    }

    async get<T>(url: string, headers?: Headers, timeout?: number) {
        return await this.request<T>("GET", url, undefined, headers, timeout);
    }

    async post<T>(url: string, data?: any, headers?: Headers, timeout?: number) {
        return await this.request<T>("POST", url, data, headers, timeout);
    }

    async delete<T>(url: string, headers?: Headers, timeout?: number) {
        return await this.request<T>("DELETE", url, undefined, headers, timeout);
    }
}
