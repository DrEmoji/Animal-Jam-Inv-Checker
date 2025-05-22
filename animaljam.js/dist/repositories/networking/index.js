import { PacketHandler } from './PacketHandler.js';
import { RndKMessage } from './outgoing/rndK/index.js';
import { NetworkClient } from './client/NetworkClient.js';
import { HMAC_KEY } from '../../Constants.js';
import { readdir } from 'node:fs/promises';
import { createHmac } from 'node:crypto';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
export class NetworkingRepository extends NetworkClient {
    options;
    packetHandler = new PacketHandler(this);
    user = null;
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
    constructor(options) {
        super({
            host: options.host,
            port: options.port,
            proxy: options.proxy,
            domain: options.domain ?? 'flash',
            reconnect: options.reconnect,
            reconnectDelay: options.reconnectDelay,
            reconnectAttempts: options.reconnectAttempts,
            maxReconnectAttempts: options.maxReconnectAttempts,
        });
        this.options = options;
    }
    static async createClient(options) {
        if (options.domain !== 'mobile')
            options.host = `lb-${options.host.replace(/\.(stage|prod)\.animaljam\.internal$/, '-$1.animaljam.com')}`;
        const networking = new NetworkingRepository({
            host: options.host,
            port: options.port,
            auth_token: options.auth_token,
            screen_name: options.screen_name,
            deploy_version: options.deploy_version,
            domain: options.domain ?? 'flash',
            proxy: options.proxy ?? undefined,
            reconnect: options.reconnect ?? false,
            reconnectDelay: options.reconnectDelay ?? 1000,
            reconnectAttempts: options.reconnectAttempts ?? 0,
            maxReconnectAttempts: options.maxReconnectAttempts ?? 0,
        });
        await networking.usePacketHandlers();
        return networking;
    }
    async connect() {
        await super.connect();
        this.on('received', this.onReceivedMessage.bind(this));
        this.sendRawMessage(RndKMessage.build());
    }
    async sendRawMessage(message) {
        return await this.write(message);
    }
    async sendXTMessage(args) {
        const message = `%xt%o%${args.join('%')}%`;
        return await this.sendRawMessage(message);
    }
    createHmacMessage(message) {
        if (this.options.domain !== 'mobile')
            throw new Error('createHmacMessage is only supported for mobile');
        if (!this.user)
            throw new Error('user is not set, call connect() first');
        const secret = `${HMAC_KEY}${this.user.session}`;
        message = `${message}${this.user.uuid}`;
        return createHmac('sha256', secret)
            .update(message)
            .digest('base64');
    }
    async usePacketHandlers() {
        const handlers = await readdir(path.resolve(dirname(fileURLToPath(import.meta.url)), './incoming'), {
            recursive: true
        });
        for (const handler of handlers.filter(handler => /index\.(ts|js)$/i.test(handler)))
            import(`./incoming/${handler}`);
    }
    async waitForMessageOfType(type, { timeout }) {
        return new Promise((resolve, reject) => {
            const onMessage = (message) => {
                if (message.type === type) {
                    this.off('message', onMessage);
                    resolve(message);
                }
            };
            this.on('message', onMessage);
            setTimeout(() => {
                this.off('message', onMessage);
                reject(new Error(`Timeout waiting for message of type ${type}`));
            }, timeout);
        });
    }
    onReceivedMessage(buffer) {
        const message = buffer.toString();
        const validMessage = this.packetHandler.validate(message);
        if (validMessage) {
            validMessage.parse();
            this.packetHandler.handle(validMessage);
            this.emit('message', validMessage);
        }
    }
    async close() {
        await super.close();
        this.emit('close');
    }
}
