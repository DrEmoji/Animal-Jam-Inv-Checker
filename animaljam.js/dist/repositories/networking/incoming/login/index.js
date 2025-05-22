var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IncomingMessageHandler } from '../../decorators/PacketHandler.js';
import { User } from '../../objects/user/index.js';
export class LoginMessage {
    async handle({ message }, networking) {
        const { statusId, params } = message.b.o;
        if (statusId !== 1)
            return;
        networking.user = new User({
            username: params.userName,
            session: params.sessionId,
            uuid: params.uuid,
        });
        // if (networking.options.domain === 'mobile') {
        //     await networking.sendRawMessage(`%xt%o%rj%-1%Jamaa.World#-1%0%`);
        // }
        // else {
        //     await networking.sendRawMessage(`%xt%o%rj%-1%jamaa_township.room_main#-1%1%0%0%`);
        // }
        console.log('Login successful!');
        networking.emit('ready', networking.user);
    }
}
__decorate([
    IncomingMessageHandler({
        message: 'login',
    })
], LoginMessage.prototype, "handle", null);
