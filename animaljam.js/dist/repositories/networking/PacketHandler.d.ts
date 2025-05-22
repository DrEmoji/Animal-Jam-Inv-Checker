import { NetworkingRepository } from '../networking/index.js';
import { JSONMessage } from './messages/JSONMessage.js';
import { XMLMessage } from './messages/XMLMessage.js';
import { XTMessage } from './messages/XTMessage.js';
export declare class PacketHandler {
    private readonly networking;
    constructor(networking: NetworkingRepository);
    validate(message: string): XMLMessage | JSONMessage | XTMessage;
    handle(validMessage: XMLMessage | JSONMessage | XTMessage): void;
}
