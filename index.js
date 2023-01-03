import express from "express"

const app = express()

const courses = [
    {id: 1, name: "JavaScript" },
    {id: 3, name: "Express" },
    {id: 2, name: "NodeJS" },
]

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

/// RUN ///
app.listen(3000, function() {
    console.log("Running!")
})