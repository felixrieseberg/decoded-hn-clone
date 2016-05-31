'use strict';

function Comment(options) {
    if (!options) {
        options = {};
    }
    
    this.author = options.author;
    this.parent_id = options.parent_id;
    this.body = options.body;
    this.upvotes = options.upvotes;
    this.timestamp = options.timestamp;
}

module.exports = Comment;
