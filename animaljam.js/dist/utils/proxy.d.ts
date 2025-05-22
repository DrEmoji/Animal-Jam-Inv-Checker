export interface Proxy {
    host: string;
    port: number;
}
export declare function handleSocketResponse(data: Buffer): {
    statusCode: number;
    statusMessage: string;
};
export declare function createConnectRequest(targetHost: string, targetPort: number, keepAlive?: boolean): Buffer;
