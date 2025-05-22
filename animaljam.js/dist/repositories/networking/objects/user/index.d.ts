import { UserObjectContract } from './UserObjectContract.js';
export declare class User implements UserObjectContract {
    username: string;
    uuid: string;
    session: string;
    constructor(options: UserObjectContract);
}
