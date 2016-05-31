'use strict';

const DocumentClient = require('documentdb').DocumentClient;
const host = process.env.DOCDB_HOST || 'https://decoded-hn.documents.azure.com:443';
const masterKey = process.env.DOCDB_KEY || '';
const client = new DocumentClient(host, {masterKey});

const DATABASE_ID = 'decoded-news';
const POSTS_ID = 'posts';
const USERS_ID = 'users';

// Ensure database
module.exports = {
    getOrCreateDatabase(databaseId) {
        return new Promise((resolve, reject) => {
            const querySpec = {
                query: 'SELECT * FROM root r WHERE r.id= @id',
                parameters: [{
                    name: '@id',
                    value: databaseId
                }]
            };
            
            client.queryDatabases(querySpec).toArray((err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length === 0) {
                        const databaseSpec = {
                            id: databaseId
                        };

                        client.createDatabase(databaseSpec, (err, created) => resolve(created));
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    },
    
    getOrCreateCollection(databaseLink, collectionId) {
        return new Promise((resolve, reject) => {
            const querySpec = {
                query: 'SELECT * FROM root r WHERE r.id=@id',
                parameters: [{
                    name: '@id',
                    value: collectionId
                }]
            };             

            client.queryCollections(databaseLink, querySpec).toArray((err, results) => {
                if (err) {
                    reject(err);
                } else {        
                    if (results.length === 0) {
                        const collectionSpec = {
                            id: collectionId
                        };
                        const requestOptions = {
                            offerType: 'S1'
                        };

                        client.createCollection(databaseLink, collectionSpec, requestOptions, (err, created) => {
                            resolve(created);
                        });

                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    },
    
    client,
    DATABASE_ID,
    POSTS_ID,
    USERS_ID
}