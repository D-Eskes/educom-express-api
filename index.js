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

app.get("/courses", function(request, response) {
    
    mongo.fetch("courses", null)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

app.get("/courses/:id", function(request, response) {
    
    mongo.fetch("courses", request.params.id)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

/// POST ///
app.post("/courses", (request, response) => {

    let data = request.body
  
    mongo.create("courses", data)
    .then(result => {
        response.send(result)
    })
    .catch(error => {
        response.send(error)
    })

})

/// PUT ///
app.put("/courses/:id", function(request, response) {
    
    let data = request.body

    mongo.update("courses", request.params.id, data)
    .then(function(result) {
        response.send(result)
    })
    .catch(function(error) {
        response.send(error)
    })

})

/// DELETE ///
app.delete("/courses/:id", function(request, response) {

    mongo.delete("courses", request.params.id)
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