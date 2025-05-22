import { NetworkingRepository } from '../../index.js';
import { JSONMessage } from '../../messages/JSONMessage.js';
export declare class LoginMessage {
    handle({ message }: JSONMessage, networking: NetworkingRepository): Promise<void>;
}
