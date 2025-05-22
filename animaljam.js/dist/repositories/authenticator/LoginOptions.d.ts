import { Proxy } from '../../utils/proxy.js';
export interface LoginOptions {
    screen_name: string;
    password: string;
    domain?: 'flash' | 'mobile';
    proxy?: Proxy;
}
