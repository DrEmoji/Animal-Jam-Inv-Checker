import { Proxy } from '../../utils/proxy.js';
export interface NetworkingRepositoryOptions {
    host: string;
    port: number;
    auth_token: string;
    screen_name: string;
    deploy_version: string;
    domain?: 'flash' | 'mobile';
    reconnect?: boolean;
    reconnectDelay?: number;
    reconnectAttempts?: number;
    maxReconnectAttempts?: number;
    proxy?: Proxy;
}
