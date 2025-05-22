import { RequestInit } from 'node-fetch';
import { Proxy } from '../utils/proxy.js';
export interface AnimalJamRequestOptions extends RequestInit {
    param?: string;
    rawDecompress?: boolean;
    objectMode?: boolean;
    headers?: RequestInit['headers'];
    includeDeployVersion?: boolean;
    includeHost?: boolean;
    proxy?: Proxy;
}
