import fetch from 'node-fetch';
import { defaultsDeep } from 'lodash-es';
import { createHash } from 'node:crypto';
import { Readable } from 'node:stream';
import { inflate, inflateRaw } from 'node:zlib';
import { HASH_KEY } from '../Constants.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class Request {
    deaultHeaders = {
        'Host': 'ajcontent.akamaized.net',
    };
    deployVersion;
    async send(url, { includeHost = true, ...userOptions }) {
        const options = defaultsDeep(userOptions, {
            headers: {
                ...this.deaultHeaders ?? userOptions.headers ?? {},
            },
        });
        if (options.proxy)
            options.agent = new HttpsProxyAgent(`http://${options.proxy.host}:${options.proxy.port}`);
        if (!includeHost)
            delete options.headers['Host'];
        if (options.param)
            url = `${url.replace(/\[deploy_version\]/g, this.deployVersion)}/${this.hash(options.param)}`;
        if (options.timeout)
            options.disp;
        const response = await fetch(url, options);
        const animalResponse = {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
        switch (animalResponse.headers.get('Content-Type')) {
            case 'audio/mpeg':
                animalResponse.data = Buffer.from(await response.arrayBuffer());
                break;
            case 'binary/octet-stream':
                const buffer = Buffer.from(await response.arrayBuffer());
                animalResponse.data = userOptions.objectMode ? Object.values(await this.decompress(buffer, options.rawDecompress)) : await this.decompress(buffer, options.rawDecompress);
                break;
            case 'application/json; charset=utf-8':
                animalResponse.data = await response.json();
                break;
            default:
                animalResponse.data = await response.text();
        }
        return animalResponse;
    }
    setDeployVersion(deployVersion) {
        this.deployVersion = deployVersion;
    }
    async decompress(buffer, rawDecompress) {
        const amfjs = await import('amfjs');
        const { AMF3, AMFDecoder } = amfjs.default ?? amfjs;
        const decompressed = await new Promise((resolve, reject) => rawDecompress ? inflateRaw(buffer, (error, decoded) => {
            if (error)
                reject(error);
            else
                resolve(decoded);
        }) : inflate(buffer, (error, decoded) => {
            if (error)
                reject(error);
            else
                resolve(decoded);
        }));
        const stream = new Readable();
        stream.push(decompressed);
        stream.push(null);
        const decoder = new AMFDecoder(stream);
        return decoder.decode(AMF3);
    }
    hash(input) {
        let increment = 0;
        let output = '';
        input = `${HASH_KEY}${input}`;
        while (increment < input.length) {
            if (increment % 2 == 0) {
                output = output + input.charAt(increment);
            }
            else {
                output = input.charAt(increment) + output;
            }
            increment++;
        }
        return createHash('md5')
            .update(output)
            .digest('hex');
    }
}
