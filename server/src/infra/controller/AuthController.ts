import { Http } from "../http/Http";

export class AuthController {

    constructor(
        readonly http: Http,
    ) {
        http.route("post", "/login", async function (params: any, body: any) {
            if (body.username === "demo@example.com" && body.password === "password123") {
                const token = {
                    hash: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                    user: {
                        name: "Demo User"
                    }
                }
                return token
            }
        });
    };
}