import { NetworkingRepository } from '../index.js';
import { PacketHandleOptions } from './PacketHandleOptions.js';
export declare const handlers: Handler<any>[];
interface Handler<T> {
    message: string;
    handler: (message: T, networking: NetworkingRepository) => any;
}
export declare function IncomingMessageHandler<T>(options: PacketHandleOptions): MethodDecorator;
export {};
