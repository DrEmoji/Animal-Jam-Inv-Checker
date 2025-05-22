export class User {
    username;
    uuid;
    session;
    constructor(options) {
        this.username = options.username;
        this.uuid = options.uuid;
        this.session = options.session;
    }
}
