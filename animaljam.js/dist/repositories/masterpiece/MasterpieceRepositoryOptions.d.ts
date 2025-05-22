export interface MasterpieceEncodeRepositoryOptions {
    imagePath: string;
    type?: 'aja2id' | 'ajg1id';
    uuid: string;
    saveFile?: boolean;
    saveFileMasterpiecePath?: string;
}
export interface MasterpieceDecodeRepositoryOptions {
    masterpiecePath: string;
    uuid: string;
    saveFile?: boolean;
    saveFileMasterpiecePath?: string;
}
