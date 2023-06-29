export interface Connection {
    query(statement: string, params: unknown): Promise<any>;
    close(): Promise<void>;
}
