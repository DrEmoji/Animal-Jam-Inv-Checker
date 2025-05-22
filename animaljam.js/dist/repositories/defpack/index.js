import { Repository } from '../index.js';
import { API_URL } from '../../Constants.js';
export class DefPackRepository extends Repository {
    async decode(id, { type = 'nameStrId', ...options }) {
        const name = `${id}.json`;
        const [defaultDefpack, defpack] = await Promise.all([
            this.getDefaultDefpack(),
            this.client.request.send(`${API_URL}/[deploy_version]/defPacks`, {
                method: 'GET',
                param: id,
                rawDecompress: true
            })
        ]);
        const deserializedDefpack = this.deserialize({
            type,
            defaultDefpack,
            defpack: defpack.data
        });
        if (options?.saveFile) {
            const path = options?.saveFileDefpackPath ?? `./${name}`;
            await this.saveAssetFile(name, path, Buffer.from(JSON.stringify(deserializedDefpack, null, 2)));
        }
        return deserializedDefpack;
    }
    async getDefaultDefpack() {
        const response = await this.client.request.send(`${API_URL}/[deploy_version]/defPacks`, {
            method: 'GET',
            param: '10230',
            rawDecompress: true,
            objectMode: false
        });
        return response.data;
    }
    deserialize(options) {
        for (const obj in options.defpack) {
            if (options.defpack[obj]?.hasOwnProperty(options.type))
                options.defpack[obj].name = options.defaultDefpack[options.defpack[obj][options.type]];
        }
        return options.defpack;
    }
}
