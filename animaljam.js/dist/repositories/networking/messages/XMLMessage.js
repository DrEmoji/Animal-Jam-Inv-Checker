import { load } from "cheerio";
import { Message } from "./Message.js";
export class XMLMessage extends Message {
    parse() {
        this.message = load(this.messageRaw, {
            xmlMode: true
        });
        this.type = this.message('body').attr('action');
    }
    toMessage() {
        return this.message.xml();
    }
}
