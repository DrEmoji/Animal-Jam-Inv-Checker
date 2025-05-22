import { Repository } from '../index.js';
import { API_URL } from '../../Constants.js';
export class AudioRepository extends Repository {
    async decode(name, options) {
        name = `${name}.mp3`;
        const response = await this.client.request.send(`${API_URL}/[deploy_version]/audio`, {
            method: 'GET',
            param: name,
        });
        if (options?.saveFile) {
            const path = options?.saveFileAudioPath ?? `./${name}`;
            await this.saveAssetFile(name, path, response.data);
        }
        return response.data;
    }
}
