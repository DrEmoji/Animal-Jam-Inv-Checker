import { Message } from "./Message.js";
export class XTMessage extends Message {
    parse() {
        this.message = this.messageRaw.split('%');
        this.type = this.message[2];
    }
    toMessage() {
        return this.message.join('%');
    }
}
