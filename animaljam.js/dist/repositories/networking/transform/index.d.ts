import { Transform, TransformCallback, TransformOptions } from 'stream';
export declare class DelimiterTransform extends Transform {
    private delimiter;
    private buffer;
    constructor(delimiter: Buffer | number, options?: TransformOptions);
    _transform(chunk: Buffer, encoding: string, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
