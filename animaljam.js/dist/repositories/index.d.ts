import { AnimalJamClient } from '../Client.js';
export declare abstract class Repository {
    readonly client: AnimalJamClient;
    constructor(client: AnimalJamClient);
    decode?(...args: any[]): Promise<any>;
    protected saveAssetFile(name: string, path: string, buffer: Buffer): Promise<void>;
}
