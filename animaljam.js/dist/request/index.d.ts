import { AnimalJamRequestOptions } from './AnimalJamRequestOptions.js';
import { AnimalJamResponse } from './AnimalJamResponse.js';
export declare class Request {
    private readonly deaultHeaders;
    private deployVersion;
    send<T = any>(url: string, { includeHost, ...userOptions }: AnimalJamRequestOptions): Promise<AnimalJamResponse<T>>;
    setDeployVersion(deployVersion: string): void;
    private decompress;
    private hash;
}
