import { Repository } from '../index.js';
import { API_URL } from '../../Constants.js';
export class RoomRepository extends Repository {
    async decode(map, options) {
        const file = `${options.file}.xroom`;
        const response = await this.client.request.send(`${API_URL}/[deploy_version]/roomDefs/${map}`, {
            method: 'GET',
            param: file,
        });
        return response.data;
    }
}
