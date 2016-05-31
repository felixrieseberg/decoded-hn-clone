'use strict';

function User(options) {
    if (!options) {
        options = {};
    }
    
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.email = options.email;
}

module.exports = User;
