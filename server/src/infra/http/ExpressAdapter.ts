import { Http } from "./Http";
import express, { Request, Response } from "express";

export class ExpressAdapter implements Http {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(function (req: any, res: any, next: any) {
            res.header("Access-Control-Allow-Origin", "http://localhost:5173");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(function (req: any, res: any, next: any) {
            if (req.url === "/login") return next();
            if (req.method === "OPTIONS") return next();
            const authorization = req.headers["authorization"];
            if (authorization) {
                const loginDataJSON = authorization.replace("Bearer ", "");
                const loginData = JSON.parse(loginDataJSON);
                if (loginData.hash === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c") {
                    return next();
                }
            }
            res.status(401).end();
        });
    };

    route(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: Request, res: Response) {
            const output = await callback(req.params, req.body);
            res.json(output)
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}
