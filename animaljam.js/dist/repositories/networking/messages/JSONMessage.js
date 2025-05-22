import { Message } from './Message.js';
export class JSONMessage extends Message {
    parse() {
        this.message = JSON.parse(this.messageRaw);
        this.type = this.message.b.o._cmd;
    }
    toMessage() {
        return JSON.stringify(this.message);
    }
}
