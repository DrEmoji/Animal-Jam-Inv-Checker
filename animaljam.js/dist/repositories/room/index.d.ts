import { Repository } from '../index.js';
import { RoomRepositoryOptions } from './RoomRepositoryOptions.js';
import { RoomRepositoryResponse } from './RoomRepositoryResponse.js';
export declare class RoomRepository extends Repository {
    decode(map: string, options: RoomRepositoryOptions): Promise<RoomRepositoryResponse>;
}
