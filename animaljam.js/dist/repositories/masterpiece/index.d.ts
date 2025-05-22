import { Repository } from '../index.js';
import { MasterpieceDecodeRepositoryOptions, MasterpieceEncodeRepositoryOptions } from './MasterpieceRepositoryOptions.js';
export declare class MasterpieceRepository extends Repository {
    encode({ type, ...options }: MasterpieceEncodeRepositoryOptions): Promise<void | Buffer>;
    decode(options: MasterpieceDecodeRepositoryOptions): Promise<void | Buffer>;
    private compress;
    decompress(image: Buffer): Promise<Buffer>;
    private getKeys;
    private encrypt;
    private decrypt;
}
