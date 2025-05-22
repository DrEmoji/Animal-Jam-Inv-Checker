var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IncomingMessageHandler } from '../../decorators/PacketHandler.js';
import { LoginMessage } from '../../outgoing/login/index.js';
export class RndKMessage {
    handle({ message }, networking) {
        const hash = message('msg').text();
        networking.sendRawMessage(LoginMessage.build({
            isMobile: networking.options.domain === 'mobile',
            screen_name: networking.options.screen_name,
            auth_token: networking.options.auth_token,
            deploy_version: networking.options.deploy_version,
            hash: hash
        }));
    }
}
__decorate([
    IncomingMessageHandler({
        message: 'rndK',
    })
], RndKMessage.prototype, "handle", null);
