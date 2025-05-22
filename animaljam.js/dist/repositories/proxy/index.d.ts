import { Repository } from '../index.js';
import { ProxyRepositoryOptions, ProxyRepositoryResponse } from './ProxyRepositoryOptions.js';
export declare class ProxyRepository extends Repository {
    timeout: number;
    test({ concurrency, timeout, ...options }: ProxyRepositoryOptions): Promise<ProxyRepositoryResponse[]>;
    private http;
    private socks;
}
