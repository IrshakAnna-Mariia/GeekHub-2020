const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {resolve} = require('path')
const fs = require("fs")
const bodyParser = require("body-parser")
const PORT = config.get('port') || 8000

const server = express();

server.use(express.static(
    resolve(__dirname, "todo-list", "dist")
));

server.use(bodyParser.json())

server.get("/get", (req, res) => {
    fs.readFile(resolve(__dirname, "todo.json"), 'utf8', (err, data) => {
        if (err) {
            console.log("Ny i", err)
        }
        res.send(data);
    });
})

server.post("/post", (req, res) => {
    fs.writeFile(resolve(__dirname, "todo.json"),
        JSON.stringify(req.body, null, 4),
        'utf8',
        (err) => {console.log(err)}
        );
})

async function start() {
    try{
        await mongoose.connect(config.get('urlMongodb'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        server.listen(PORT, () => console.log(`Do it! Port: ${PORT}`))
    } catch (err) {
        console.log('Error', err.message)
        process.exit(1)
    }
}

start()