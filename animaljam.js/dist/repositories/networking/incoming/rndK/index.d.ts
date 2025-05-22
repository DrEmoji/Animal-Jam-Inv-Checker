import { NetworkingRepository } from '../../index.js';
import { XMLMessage } from '../../messages/XMLMessage.js';
export declare class RndKMessage {
    handle({ message }: XMLMessage, networking: NetworkingRepository): void;
}
