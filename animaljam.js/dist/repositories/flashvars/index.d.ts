import { Repository } from '../index.js';
import { FlashvarsRepositoryResponse } from './FlashvarsRepositoryResponse.js';
export declare class FlashvarsRepository extends Repository {
    fetch(): Promise<FlashvarsRepositoryResponse>;
}
