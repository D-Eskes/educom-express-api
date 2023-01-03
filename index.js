import express from "express"

const app = express()
app.use(express.json())
app.use((request, result, next) => {
    result.setHeader("Access-Control-Allow-Origin", "*")
    result.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    result.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
    next()
})

const courses = [
    {id: 1, name: "JavaScript" },
    {id: 3, name: "Express" },
    {id: 2, name: "NodeJS" },
]

/// FETCH ///
let course = {
    name: "Express Server API",
    level: "intermediate",
    technology: ["JavaScript", "NodeJS", "Express", "MongoDB"]        
}
let url = "http://localhost:3000/courses"


fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
})
.then(entry => entry.json())
.then(entry => {
    console.log(entry)
})
.catch(error => {
    console.log(error)
})


/// GET ///
app.get("/", function(request, response) {
    response.send({page: "Homepage"})
})

app.get("/courses", function(request, response) {
    response.send(courses)
})

app.get("/courses/:id", function(request, response) {
    let searchId = parseInt(request.params.id)
    let result = courses.filter(function(course) {
        return (course.id === searchId)
    })
    response.send(result[0])
})

/// POST ///
app.post("/courses", (request, response) => {
    console.log(request.body)
    response.send({received: request.body})
})

/// PUT ///
app.put("/courses/:id", (request, response) => {
    let searchId = parseInt(request.params.id)
    response.send({id: searchId, received: request.body})
})

/// RUN ///
app.listen(3000, function() {
    console.log("Running!")
})