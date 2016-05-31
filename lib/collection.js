'use strict';

const db = require('./database');

module.exports = class Collection {
    constructor(options) {
        // Ensure that database and collection exist
        db.getOrCreateDatabase(options.databaseId)
            .then((database) => {
                this.database = database;
                
                db.getOrCreateCollection(database._self, options.collectionId).then((collection) => {
                    this.collection = collection; 
                });
            });
    }
    
    find(query) {
        return new Promise((resolve, reject) => {
            db.client.queryDocuments(this.collection._self, query).toArray((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    findAll() {
        return this.find('SELECT * FROM c');
    }
    
    get(id) {
        return new Promise((resolve, reject) => {
            const querySpec = {
                query: 'SELECT * FROM root r WHERE r.id = @id',
                parameters: [{
                    name: '@id',
                    value: id
                }]
            };
            
            db.client.queryDocuments(self.collection._self, querySpec).toArray((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
    
    add(item) {
        return new Promise((resolve, reject) => {
            db.client.createDocument(this.collection._self, item, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    update(id, item) {
        return new Promise((resolve, reject) => {
            this.getItem(id)
                .then((result) => {
                    db.client.replaceDocument(result._self, item, (err, replaced) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(replaced);
                        }
                    });
                });
        });
    }
}