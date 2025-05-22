import { NetworkingRepositoryOptions } from './NetworkingRepositoryOptions.js';
import { NetworkClient } from './client/NetworkClient.js';
import { User } from './objects/user/index.js';
import { XMLMessage } from './messages/XMLMessage.js';
import { JSONMessage } from './messages/JSONMessage.js';
import { XTMessage } from './messages/XTMessage.js';
export declare class NetworkingRepository extends NetworkClient {
    readonly options: NetworkingRepositoryOptions;
    private readonly packetHandler;
    user: User | null;
    on(event: 'message', listener: (message: XMLMessage | JSONMessage | XTMessage) => void): this;
    on(event: 'ready', listener: (user: User) => void): this;
    on(event: 'received', listener: (message: any) => any): this;
    on(event: 'error', listener: (error: Error) => any): this;
    on(event: 'close', listener: () => any): this;
    on(event: 'reconnect', listener: () => any): this;
    on(event: 'reconnecting', listener: ({ attempt, delay }: {
        attempt: number;
        delay: number;
    }) => any): this;
    on(event: 'reconnect_failed', listener: (error: Error) => any): this;
    on(event: 'reconnect_error', listener: ({ attempt, delay }: {
        attempt: number;
        delay: number;
    }) => any): this;
    constructor(options: NetworkingRepositoryOptions);
    static createClient(options: NetworkingRepositoryOptions): Promise<NetworkingRepository>;
    connect(): Promise<void>;
    sendRawMessage(message: string): Promise<number>;
    sendXTMessage(args: string[]): Promise<number>;
    createHmacMessage(message: string): string;
    usePacketHandlers(): Promise<void>;
    waitForMessageOfType<T = XMLMessage | JSONMessage | XTMessage>(type: string, { timeout }: {
        timeout: number;
    }): Promise<T>;
    private onReceivedMessage;
    close(): Promise<void>;
}
