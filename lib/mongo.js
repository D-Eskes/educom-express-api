import {MongoClient, ObjectId} from "mongodb"

const mongoUrl = "mongodb://localhost:27017"
const mongoDB = "express"


export default class mongo {

    static list = function(database) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(mongoUrl, function(error, client) {
                
                if (error) {
                    reject({error: error})
                }
 

                if (database) {
                    client.db(database).listCollections().toArray(function(error, result) {
                        client.close()
                        if (error) {
                            reject({error: error})
                        }
                        resolve(result)
                    })
                    return
                }
                
                client.db(database).admin().listDatabases(function(error, result) {
                    client.close()
                    if (error) {
                        reject({error: error})
                    }
                    resolve(result.databases)
                })
                
                
            })
        })
    }


    static create = function(database, collection, data) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }

                let db = client.db(database)

                db.collection(collection).insertOne(data, function(error, result) {
                    client.close()
                    if (error) {
                        reject({error: error})
                    }
                    resolve(result)
                })
            })
        })
    }

    static fetch = function(database, collection, id) {
        return new Promise(function(resolve, reject) {
            let query = id ? {_id: new ObjectId(id)} : {}

            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }

                let db = client.db(database)

                db.collection(collection).find(query).toArray(function(error, result) {
                    client.close()
                    if (error) {
                        reject({error: error})
                    }
                    resolve(result)
                })
            })
        })
    }

    static update = function(database, collection, id, data) {
        return new Promise(function(resolve, reject) {
            let query = {_id: new ObjectId(id)}
            let newData = {$set: data}

            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }
                let db = client.db(database)

                db.collection(collection)
                .updateOne(query, newData, function(error, result) {
                    client.close()
                    if (error) {
                        reject({error: error})
                    }
                    resolve({_id: id, updated: true})
                })
            })
        })
    }

    static delete = function(database, collection, id) {
        return new Promise(function(resolve, reject) {
            let query = {_id: new ObjectId(id)}

            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }
                let db = client.db(database)

                db.collection(collection)
                .deleteOne(query, function(error, result) {
                    client.close()
                    if (error) {
                        reject({error: error})
                    }
                    resolve({_id: id, deleted: true})
                })
            })
        })
    }
}
