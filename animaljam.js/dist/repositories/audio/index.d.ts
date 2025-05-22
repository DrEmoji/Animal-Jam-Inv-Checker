import { Repository } from '../index.js';
import { AudioRepositoryOptions } from './AudioRepositoryOptions.js';
export declare class AudioRepository extends Repository {
    decode(name: string, options?: AudioRepositoryOptions): Promise<Buffer>;
}
