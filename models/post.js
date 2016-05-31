'use strict';

function Post(options) {
    if (!options) {
        options = {};
    }
    
    this.post_id = options.post_id;
    this.url = options.url;
    this.title = options.title;
    this.upvotes = options.upvotes;
    this.timestamp = options.timestamp;
    this.author = options.author;
}

module.exports = Post;
