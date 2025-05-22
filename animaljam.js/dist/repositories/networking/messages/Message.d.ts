export declare abstract class Message<T> {
    readonly messageRaw: string;
    type: string;
    message: T;
    constructor(messageRaw: string);
    abstract parse(): void;
    abstract toMessage(): string;
}
