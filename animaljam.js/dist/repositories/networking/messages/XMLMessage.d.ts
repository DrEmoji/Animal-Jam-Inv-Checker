import { CheerioAPI } from "cheerio";
import { Message } from "./Message.js";
export declare class XMLMessage extends Message<CheerioAPI> {
    parse(): void;
    toMessage(): string;
}
