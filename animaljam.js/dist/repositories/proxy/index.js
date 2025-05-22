import { ANIMAL_JAM_AUTHENTICATOR } from '../../Constants.js';
import { Repository } from '../index.js';
import { HttpProxyAgent } from 'http-proxy-agent';
import pLimit from 'p-limit';
import { createConnection } from 'node:net';
import { createConnectRequest, handleSocketResponse } from '../../utils/proxy.js';
export class ProxyRepository extends Repository {
    timeout;
    async test({ concurrency = 10, timeout = 5000, ...options }) {
        this.timeout = timeout;
        const limit = pLimit(concurrency);
        const proxies = options.proxies.map(proxy => limit(() => {
            if (proxy.type === 'http')
                return this.http(proxy);
            else if (proxy.type === 'socks5')
                return this.socks(proxy);
            else
                throw new Error('Invalid proxy type');
        }));
        return await Promise.all(proxies);
    }
    async http(proxy) {
        const proxyUrl = `https://${proxy.host}:${proxy.port}`;
        const agent = new HttpProxyAgent(proxyUrl);
        try {
            await this.client.request.send(ANIMAL_JAM_AUTHENTICATOR, {
                method: 'GET',
                includeHost: false,
                headers: {
                    'host': 'authenticator.animaljam.com',
                },
                agent: agent,
            });
            return { proxy, isWorking: true };
        }
        catch (error) {
            return { proxy, isWorking: false };
        }
    }
    async socks(proxy) {
        const connectRequest = createConnectRequest(`lb-iss02-classic-prod.animaljam.com`, 443);
        const proxySocket = createConnection({
            host: proxy.host,
            port: proxy.port,
        });
        let connectionTimeoutId;
        let dataTimeoutId;
        return new Promise((resolve) => {
            proxySocket.once('timeout', () => {
                proxySocket.destroy();
                clearTimeout(dataTimeoutId);
                resolve({ proxy, isWorking: false });
            });
            proxySocket.once('connect', () => {
                clearTimeout(connectionTimeoutId);
                proxySocket.write(connectRequest);
                dataTimeoutId = setTimeout(() => {
                    proxySocket.destroy();
                    resolve({ proxy, isWorking: false });
                }, this.timeout);
            });
            proxySocket.once('data', async (data) => {
                clearTimeout(dataTimeoutId);
                const { statusCode } = handleSocketResponse(data);
                if (statusCode === 200) {
                    proxySocket.end();
                    resolve({ proxy, isWorking: true });
                }
                else {
                    proxySocket.end();
                    resolve({ proxy, isWorking: false });
                }
            });
            proxySocket.once('error', (err) => {
                console.error('Socket error:', err.message);
                clearTimeout(connectionTimeoutId);
                clearTimeout(dataTimeoutId);
                proxySocket.destroy();
                resolve({ proxy, isWorking: false });
            });
            proxySocket.once('close', () => {
                clearTimeout(connectionTimeoutId);
                clearTimeout(dataTimeoutId);
                proxySocket.destroy();
                resolve({ proxy, isWorking: false });
            });
            connectionTimeoutId = setTimeout(() => {
                proxySocket.destroy();
                resolve({ proxy, isWorking: false });
            }, this.timeout);
        });
    }
}
