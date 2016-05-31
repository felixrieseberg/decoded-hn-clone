'use strict';

const db = require('./database');
const Collection = require('./collection');

module.exports = class UserCollection extends Collection {
    constructor() {
        super({
            databaseId: db.DATABASE_ID,
            collectionId: db.USERS_ID
        });
    }
}