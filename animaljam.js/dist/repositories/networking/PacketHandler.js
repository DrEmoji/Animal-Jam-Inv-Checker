import { handlers } from './decorators/PacketHandler.js';
import { JSONMessage } from './messages/JSONMessage.js';
import { XMLMessage } from './messages/XMLMessage.js';
import { XTMessage } from './messages/XTMessage.js';
export class PacketHandler {
    networking;
    constructor(networking) {
        this.networking = networking;
    }
    validate(message) {
        const type = message.charAt(0);
        switch (type) {
            case '<':
                return new XMLMessage(message);
            case '{':
                return new JSONMessage(message);
            case '%':
                return new XTMessage(message);
        }
    }
    handle(validMessage) {
        const { type } = validMessage;
        for (const handler of handlers) {
            if (handler.message === type)
                handler.handler(validMessage, this.networking);
        }
    }
}
