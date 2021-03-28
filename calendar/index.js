const express = require('express')
const {resolve} = require('path')
const fs = require("fs")
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8000;

const server = express();
server.use(express.urlencoded({ extended: false}))
const httpServer = require('http').createServer(server)
const io = require('socket.io')(httpServer);


let users = [];
fs.readFile(resolve(__dirname, "users.json"),
    'utf8',
    (err, data) => {users = JSON.parse(data)});

server.use(express.static(
    resolve(__dirname, "client", "dist")
));

server.use(bodyParser.json())

server.set('io', io)

server.get("/get", (req, res) => {
    try {
        fs.readFile(resolve(__dirname, "users.json"), 'utf8', (err, data) => {
            res.send(data);
        });
    } catch (e) {
        console.log(e);
        res.status(404).jsonp(false)
    }
})

server.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)


        let email = false;
        users.forEach((item) => {
            if (item.email === req.body.email) {
                email = true;
                res.status(201).jsonp(false)
            }
        })
        if (!email) {
            users.push({
                email: req.body.email,
                password: hashedPassword,
                events: []
            })
            fs.writeFile(resolve(__dirname, "users.json"),
                JSON.stringify(users, null, 4),
                'utf8',
                (err) => {
                    res.status(404).jsonp(err)
                }
            );
        }
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/signIn", async (req, res) => {
    try {
        let check = {
            count: 0,
            email: false,
            password: false,
            events: []
        }
        users.forEach((item) => {
            if (item.email === req.body.email) {
                check.email = true;
                check.count = 1;

                bcrypt.compare(req.body.password, item.password, (err, resp) => {
                    if (resp) {
                        check.events = [...item.events];
                        check.password = true
                        res.status(201).jsonp(check)
                    } else {
                        res.status(201).jsonp(check)
                    }
                })
            }
        })
        if (check.count === 0) {
            res.status(201).jsonp(check)
        }

    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/add", async (req, res) => {
    try {
        users.forEach((item) => {
            if (item.email === req.body.email) {
                item.events.push(req.body.event)
                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(users, null, 4),
                    'utf8',
                    (err) => {
                        res.status(404).jsonp(err)
                    }
                );
            }
        })
        res.status(201).jsonp(true)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/remove", async (req, res) => {
    try {
        users.forEach((item) => {
            if (item.email === req.body.email) {
                item.events.forEach((value, index) => {
                    if (value.day === req.body.event.day
                        && value.time === req.body.event.time
                        && value.text === req.body.event.text
                    ) {
                        item.events = [
                            ...item.events.slice(0, index),
                            ...item.events.slice(index + 1)
                        ]
                    }
                })

                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(users, null, 4),
                    'utf8',
                    (err) => {
                        res.status(404).jsonp(err)
                    }
                );
            }
        })
        res.status(201).jsonp(true)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/edit", async (req, res) => {
    try {
        users.forEach((item) => {
            if (item.email === req.body.email) {
                item.events.forEach((value, index) => {
                    if (value.day === req.body.editedEvent.day
                        && value.time === req.body.editedEvent.time
                        && value.text === req.body.editedEvent.text
                    ) {
                        item.events = [
                            ...item.events.slice(0, index),
                            req.body.currentEvent,
                            ...item.events.slice(index + 1)
                        ]
                    }
                })

                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(users, null, 4),
                    'utf8',
                    (err) => {
                        res.status(404).jsonp(err)
                    }
                );
            }
        })
        res.status(201).jsonp(true)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

async function start() {
    try{
        httpServer.listen(PORT, () => console.log(`Do it! Port: ${PORT}`))
    } catch (err) {
        console.log('Error', err.message)
        process.exit(1)
    }
}

start()