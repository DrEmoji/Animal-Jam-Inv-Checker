import { Repository } from '../index.js';
import { AuthenticatorRepositoryResponse } from './AuthenticatorRepositoryResponse.js';
import { LoginOptions } from './LoginOptions.js';
export declare class AuthenticatorRepository extends Repository {
    login(options: LoginOptions): Promise<AuthenticatorRepositoryResponse>;
}
