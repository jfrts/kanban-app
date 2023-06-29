import { HttpClient } from "../infra/http/HttpClient";
import { AuthService } from "./AuthService";

export class AuthServiceHttp implements AuthService {
    constructor(readonly baseUrl: string, readonly httpClient: HttpClient) { }

    async login(username: string, password: string): Promise<any> {
        const session = await this.httpClient.post(
            `${this.baseUrl}/login`,
            { username, password }
        );
        return session;
    }
}