import { AnimalJamClientOptions } from './AnimalJamClientOptions.js';
import { AudioRepository } from './repositories/audio/index.js';
import { AuthenticatorRepository } from './repositories/authenticator/index.js';
import { DefPackRepository } from './repositories/defpack/index.js';
import { FlashvarsRepository } from './repositories/flashvars/index.js';
import { MasterpieceRepository } from './repositories/masterpiece/index.js';
import { NetworkingRepository } from './repositories/networking/index.js';
import { ProxyRepository } from './repositories/proxy/index.js';
import { RoomRepository } from './repositories/room/index.js';
import { Request } from './request/index.js';
export declare class AnimalJamClient {
    readonly request: Request;
    readonly audio: AudioRepository;
    readonly room: RoomRepository;
    readonly defpack: DefPackRepository;
    readonly flashvars: FlashvarsRepository;
    readonly authenticator: AuthenticatorRepository;
    readonly proxy: ProxyRepository;
    readonly masterpiece: MasterpieceRepository;
    readonly networking: typeof NetworkingRepository;
    constructor({ deployVersion }?: AnimalJamClientOptions);
}
