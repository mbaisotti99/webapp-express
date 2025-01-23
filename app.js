const express = require("express")
const app = express()
const port = process.env.PORT

const routes = require("./router/routes")

app.use(express.json())

app.listen(port, () =>{
    console.log("Server Listening on", port);
})

app.use("/movies", routes)

