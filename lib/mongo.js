import {MongoClient, ObjectId} from "mongodb"

const mongoUrl = "mongodb://localhost:27017"
const mongoDB = "express"


export default class mongo {

    static list = function() {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(mongoUrl, function(error, client) {
                
                if (error) {
                    reject({error: error})
                }

                let adminDb = client.db(mongoDB).admin()
                adminDb.listDatabases(function(error, result) {
                    client.close()
                    if (error) {
                        reject({error: error})
                    }
                    resolve(result.databases)
                })
            })
        })
    }

    static create = function(collection, data) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }

                let db = client.db(mongoDB)

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

    static fetch = function(collection, id) {
        return new Promise(function(resolve, reject) {
            let query = id ? {_id: new ObjectId(id)} : {}

            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }

                let db = client.db(mongoDB)

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

    static update = function(collection, id, data) {
        return new Promise(function(resolve, reject) {
            let query = {_id: new ObjectId(id)}
            let newData = {$set: data}

            MongoClient.connect(mongoUrl, function(error, client) {
                if (error) {
                    reject({error: error})
                }
                let db = client.db(mongoDB)

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
}
