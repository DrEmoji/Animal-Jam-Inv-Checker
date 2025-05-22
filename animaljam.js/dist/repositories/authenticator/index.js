import { Repository } from '../index.js';
import { ANIMAL_JAM_AUTHENTICATOR } from '../../Constants.js';
export class AuthenticatorRepository extends Repository {
    async login(options) {
        const response = await this.client.request.send(`${ANIMAL_JAM_AUTHENTICATOR}/authenticate`, {
            method: 'POST',
            includeHost: false,
            headers: {
                'host': 'authenticator.animaljam.com',
                'User-Agent': 'UnityPlayer/2020.3.40f1 (UnityWebRequest/1.0, libcurl/7.84.0-DEV)',
            },
            body: JSON.stringify({
                username: options.screen_name,
                password: options.password,
                domain: options.domain ?? 'flash',
            }),
            proxy: options.proxy ?? undefined,
        });
        return response.data;
    }
}
