import { EventEmitter } from 'node:events';
import { NetworkClientOptions } from './NetworkClientOptions.js';
export declare class NetworkClient extends EventEmitter {
    readonly options: NetworkClientOptions;
    private socket;
    private reconnectAttempts;
    private reconnecting;
    constructor(options: NetworkClientOptions);
    connect(): Promise<void>;
    write(message: string): Promise<number>;
    private createProxyConnection;
    private createConnection;
    private attemptReconnect;
    close(): Promise<void>;
}
