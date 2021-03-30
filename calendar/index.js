const mongoose = require('mongoose')
const express = require('express')
const {resolve} = require('path')
const fs = require("fs")
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8000;
const User = require('./models/User')

mongoose.connect('mongodb://localhost/users', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Mongodb has started'))
    .catch((e) => console.log(e))
const server = express();
server.use(express.urlencoded({ extended: false}))
const httpServer = require('http').createServer(server)
//const io = require('socket.io')(httpServer);

const con = mongoose.connection;

con.on('open', function (){
    console.log('is cinnected...')
})


let users = [];
let usersBase = [];

User.find({}, function(err, doc) {
    //mongoose.disconnect();
    if (err) return console.log(err)
    usersBase = [...doc]
    console.log(usersBase)
})

server.use(express.static(
    resolve(__dirname, "client", "dist")
));

server.use(bodyParser.json())

//server.set('io', io)

server.get("/get", async(req, res) => {
    try {
        res.send(usersBase);
    } catch (e) {
        console.log(e);
        res.status(404).jsonp(false)
    }
})

server.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        let email = false;

        await User.findOne({email: req.body.email}, (err, doc) => {
            email = true;
            res.status(201).jsonp(false)
        })
        if (!email) {
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                events: []
            })
            User.create(newUser, (err, doc) => {
                if (err) return console.log(err)
                usersBase.push(doc)
                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(usersBase, null, 4),
                    'utf8',
                    (err) => {
                        res.status(404).jsonp(err)
                    }
                );
            })
            res.status(201).jsonp(usersBase)
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
        let document = {};
        await User.findOne({email: req.body.email}, (err, doc) => {
            check.email = true;
            check.count = 1;
            document = {password: doc.password, events: [...doc.events]}
        })
        bcrypt.compare(req.body.password, document.password, (error, resp) => {
            if (resp) {
                check.events = [...document.events];
                check.password = true
                res.status(201).jsonp(check)
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
        let events = [];
        let allUsers = [];
        await User.findOne({email: req.body.email}, (err, doc) => {
            events = [...doc.events]
        })
        events.push(req.body.event)

        await User.updateOne({email: req.body.email}, {events: events}, (err, result) => {
            User.find({}, (err, doc) => {
                allUsers = [...doc]
                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(allUsers, null, 4),
                    'utf8',
                    (err) => {
                        res.status(404).jsonp(err)
                    }
                );
            })
        })
        res.status(201).jsonp(true)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/remove", async (req, res) => {
    try {
        let events = [];
        let allUsers = [];
        await User.findOne({email: req.body.email}, (err, doc) => {
            events = [...doc.events]
        })
        events.forEach((value, index) => {
            if (value.day === req.body.event.day
                && value.time === req.body.event.time
                && value.text === req.body.event.text
            ) {
                events = [
                    events.slice(0, index),
                    events.slice(index + 1)
                ]
            }
        })

        await User.updateOne({email: req.body.email}, {events: events}, (err, result) => {
            User.find({}, (err, doc) => {
                allUsers = [...doc]
                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(allUsers, null, 4),
                    'utf8',
                    (err) => {
                        res.status(404).jsonp(err)
                    }
                );
            })
        })

        res.status(201).jsonp(true)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/edit", async (req, res) => {
    try {
        let events = [];
        await User.findOne({email: req.body.email}, (err, doc) => {
            events = [...doc.events]
        })
        events.forEach((value, index) => {
            if (value.day === req.body.editedEvent.day
                && value.time === req.body.editedEvent.time
                && value.text === req.body.editedEvent.text
            ) {

                events = [
                    ...events.slice(0, index),
                    req.body.currentEvent,
                    ...events.slice(index + 1)
                ]
            }
        })

        let allUsers = [];

        await User.updateOne({email: req.body.email}, {events: events}, (err, result) => {
            User.find({}, (err, doc) => {
                allUsers = [...doc]
                fs.writeFile(resolve(__dirname, "users.json"),
                    JSON.stringify(allUsers, null, 4),
                    'utf8',
                    (err) => {}
                );
            })
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
