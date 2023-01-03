import express from "express"
import mongo from "./lib/mongo.js"

const app = express()
app.use(express.json())
app.use((request, result, next) => {
    result.setHeader("Access-Control-Allow-Origin", "*")
    result.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    result.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
    next()
})


function cleanName(name) {
    return name.toLowerCase().trim()
}


/// GET ///
app.get("/", function(request, response) {
    
    mongo.list()
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

app.get("/:collection", function(request, response) {

    var collection = cleanName(request.params.collection)

    mongo.fetch(collection, null)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

app.get("/:collection/:id", function(request, response) {

    var collection = cleanName(request.params.collection)
    
    mongo.fetch(collection, request.params.id)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

/// POST ///
app.post("/:collection", (request, response) => {

    var collection = cleanName(request.params.collection)

    let data = request.body
  
    mongo.create(collection, data)
    .then(result => {
        response.send(result)
    })
    .catch(error => {
        response.send(error)
    })

})

/// PUT ///
app.put("/:collection/:id", function(request, response) {
    
    var collection = cleanName(request.params.collection)

    let data = request.body

    mongo.update(collection, request.params.id, data)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

/// DELETE ///
app.delete("/:collection/:id", function(request, response) {

    var collection = cleanName(request.params.collection)

    mongo.delete(collection, request.params.id)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

/// RUN ///
app.listen(3000, function() {
    console.log("Running!")
})