import { Connection } from "./Connection";
import pgp from "pg-promise";

export class PgPromiseConnection implements Connection {
    connection: any;

    constructor() {
        this.connection = pgp()("postgres://app_branas_course_user:AmIITgb19mDPwRhyuVzlmw0YQT9Km3l5@dpg-ciimefl9aq012et04qa0-a/app_branas_course");
        // this.connection = pgp()("postgres://postgres:postgres123@localhost:5432/branas");
    };

    query(statement: string, params: unknown): Promise<unknown> {
        return this.connection.query(statement, params);
    }
    
    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}
