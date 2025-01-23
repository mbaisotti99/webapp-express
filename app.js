const express = require("express")
const app = express()
const port = process.env.PORT

const routes = require("./router/routes")
const { notFound } = require("./controllers/functions")

app.use(express.json())
app.use(express.static("public"))

app.listen(port, () =>{
    console.log("Server Listening on", port);
})

app.use("/movies", routes)

app.use("/*", notFound)
