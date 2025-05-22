import { existsSync } from 'fs';
import { mkdir, writeFile } from 'node:fs/promises';
export class Repository {
    client;
    constructor(client) {
        this.client = client;
    }
    async saveAssetFile(name, path, buffer) {
        const pathToSave = `${path}/${name}`;
        if (!existsSync(path))
            await mkdir(path, { recursive: true });
        await writeFile(pathToSave, buffer);
    }
}
