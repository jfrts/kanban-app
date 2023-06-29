export interface HttpClient {
    get(url: string): Promise<any>;
    post(url: string, body: any): Promise<any>;
    delete(url: string): Promise<any>;
    put(url: string, body: any): Promise<any>;
}