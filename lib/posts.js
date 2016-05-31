'use strict';

const db = require('./database');
const Collection = require('./collection');

module.exports = class PostCollection extends Collection {
    constructor() {
        super({
            databaseId: db.DATABASE_ID,
            collectionId: db.POSTS_ID
        });
    }
}