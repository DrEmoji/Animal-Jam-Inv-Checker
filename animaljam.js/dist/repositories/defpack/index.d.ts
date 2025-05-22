import { Repository } from '../index.js';
import { DefPackRepositoryOptions } from './DefPackRepositoryOptions.js';
export declare class DefPackRepository extends Repository {
    decode(id: string, { type, ...options }: DefPackRepositoryOptions): Promise<object>;
    private getDefaultDefpack;
    private deserialize;
}
