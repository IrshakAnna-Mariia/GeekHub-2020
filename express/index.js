const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const {resolve} = require('path')
const fs = require("fs")
const bodyParser = require("body-parser")
const PORT = config.get('port') || 8000

const server = express();
const httpServer = require('http').createServer(server)
const io = require('socket.io')(httpServer);

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

server.post("/add", (req, res) => {
    fs.writeFile(resolve(__dirname, "todo.json"),
        JSON.stringify(req.body, null, 4),
        'utf8',
        (err) => {console.log(err)}
    );
    //req.server.get('io').emit('Changes complete')
})

server.post("/remove", (req, res) => {
    fs.writeFile(resolve(__dirname, "todo.json"),
        JSON.stringify(req.body, null, 4),
        'utf8',
        (err) => {console.log(err)}
    );
})

server.post("/complete", (req, res) => {
    fs.writeFile(resolve(__dirname, "todo.json"),
        JSON.stringify(req.body, null, 4),
        'utf8',
        (err) => {console.log(err)}
    );
})

server.set('io', io)

io.on('connection', socket => {
    socket.on('add_todo', (todos) => {
        try {
            io.emit("add_todo", todos)
        } catch (e) {
            console.log(e)
        }
    })
    socket.on('remove_todo', (todos) => {
        try {
            io.emit("remove_todo", todos)
        } catch (e) {
            console.log(e)
        }
    })
    socket.on('completed_todo', (todos) => {
        try {
            io.emit("completed_todo", todos)
        } catch (e) {
            console.log(e)
        }
    })
    socket.on('write_todo', (todos, addTodo_value, lastTodo_value) => {
        try {
            socket.broadcast.emit("write_todo", todos, addTodo_value, lastTodo_value)
        } catch (e) {
            console.log(e)
        }
    })

    console.log('socket connected', socket.id)
})

async function start() {
    try{
        /*await mongoose.connect(config.get('urlMongodb'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })*/

        httpServer.listen(PORT, () => console.log(`Do it! Port: ${PORT}`))
    } catch (err) {
        console.log('Error', err.message)
        process.exit(1)
    }
}

start()