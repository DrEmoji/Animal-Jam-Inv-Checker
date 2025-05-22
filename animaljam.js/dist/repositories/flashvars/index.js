import { Repository } from '../index.js';
import { ANIMAL_JAM_BASE_URL } from '../../Constants.js';
export class FlashvarsRepository extends Repository {
    async fetch() {
        const response = await this.client.request.send(`${ANIMAL_JAM_BASE_URL}/flashvars`, {
            method: 'GET',
            includeHost: false,
            headers: {
                'User-Agent': 'animaljam.js',
                'Accept': 'application/json',
            }
        });
        return response.data;
    }
}
