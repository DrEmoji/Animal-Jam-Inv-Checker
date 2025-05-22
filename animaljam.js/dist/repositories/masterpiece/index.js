import { createCipheriv, createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { Writable } from 'node:stream';
import { deflate, inflate } from 'node:zlib';
import sharp from 'sharp';
import { Repository } from '../index.js';
export class MasterpieceRepository extends Repository {
    async encode({ type = 'aja2id', ...options }) {
        const buffer = await readFile(options.imagePath);
        const resizedImage = await sharp(buffer)
            .resize(760, 460)
            .toBuffer();
        const [key, iv] = this.getKeys(options.uuid);
        const compressedImage = await this.compress(resizedImage, type, options.uuid);
        const encryptedImage = this.encrypt(compressedImage, key, iv);
        if (options.saveFile) {
            if (!options.saveFileMasterpiecePath)
                throw new Error('saveFileMasterpiecePath is required when saveFile is true.');
            const fileName = `masterpiece-${new Date().getTime()}.${type === 'aja2id' ? 'ajart' : 'ajgart'}`;
            return await this.saveAssetFile(fileName, options.saveFileMasterpiecePath, encryptedImage);
        }
        return encryptedImage;
    }
    async decode(options) {
        const buffer = await readFile(options.masterpiecePath);
        const [key, iv] = this.getKeys(options.uuid);
        const decryptedImage = this.decrypt(buffer, key, iv);
        const image = await this.decompress(decryptedImage);
        if (options.saveFile) {
            if (!options.saveFileMasterpiecePath)
                throw new Error('saveFileMasterpiecePath is required when saveFile is true.');
            const fileName = `masterpiece-${new Date().getTime()}.jpg`;
            return await this.saveAssetFile(fileName, options.saveFileMasterpiecePath, image);
        }
        return image;
    }
    async compress(image, type, uuid) {
        const amfjs = await import('amfjs');
        const { AMFEncoder } = amfjs.default ?? amfjs;
        return new Promise((resolve, reject) => {
            const data = [];
            let totalSize = 0;
            const ws = new Writable({
                write(chunk, _encoding, callback) {
                    totalSize += chunk.length;
                    data.push(chunk);
                    callback();
                },
                final(callback) {
                    const buffer = Buffer.concat(data, totalSize);
                    deflate(buffer, { level: 9 }, (err, compressed) => {
                        if (err)
                            return reject(err);
                        resolve(compressed);
                    });
                    callback();
                }
            });
            const encoder = new AMFEncoder(ws);
            encoder.writeObject({
                b: image,
                h: type,
                p: uuid
            }, amfjs.AMF3);
            ws.end();
        });
    }
    async decompress(image) {
        const amfjs = await import('amfjs');
        const { AMFDecoder } = amfjs.default ?? amfjs;
        return new Promise((resolve, reject) => {
            inflate(image, (error, decoded) => {
                if (error)
                    return reject(error);
                const decoder = new AMFDecoder(decoded);
                const { b } = decoder.decode(amfjs.AMF3);
                return resolve(b);
            });
        });
    }
    getKeys(uuid) {
        const keyLength = 16;
        const keyArray = Buffer.allocUnsafe(keyLength);
        const ivArray = Buffer.allocUnsafe(keyLength);
        for (let i = 0, counter = 0; i < keyLength; i++) {
            keyArray[i] = uuid.charCodeAt(counter++);
            ivArray[i] = uuid.charCodeAt(counter++);
        }
        return [keyArray, ivArray];
    }
    encrypt(buffer, key, iv) {
        const cipher = createCipheriv('aes-128-cbc', key, iv);
        return Buffer.concat([cipher.update(buffer), cipher.final()]);
    }
    decrypt(buffer, key, iv) {
        const decipher = createDecipheriv('aes-128-cbc', key, iv)
            .setAutoPadding(false);
        return Buffer.concat([decipher.update(buffer), decipher.final()]);
    }
}
