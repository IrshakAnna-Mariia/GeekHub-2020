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
const httpServer = require('http').createServer(server);

mongoose.connection.on('open', function (){
    console.log('is cinnected...')
});
mongoose.set("useFindAndModify", false);

server.use(express.static(
    resolve(__dirname, "client", "dist")
));

server.use(bodyParser.json());

let usersBase = [];

User.find({}, function(err, doc) {
    if (err) return console.log(err)
    usersBase = [...doc]
    console.log(usersBase.map(value => {
        return value.events
    }))
})

server.get("/get", async(req, res) => {
    try {
        let usersBase = [];

        User.find({}, function(err, doc) {
            if (err) return console.log(err)
            usersBase = [...doc]
            console.log(usersBase)
        })

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
            if (doc) {
                email = true;
            }
        })
        if (!email) {
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                events: []
            })
            await User.create(newUser, (err) => {
                if (err) return email = true
            })
        }
        res.status(201).jsonp(email)
    } catch (e) {
        res.status(404).jsonp(e)
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
            if (doc) {
                check.email = true;
                check.count = 1;
                document = {password: doc.password, events: [...doc.events]}
            }
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
        let status = true;
        await User.updateOne({email: req.body.email}, {events: req.body.events}, (err) => {
            if (err) status = false
        })
        res.status(201).jsonp(status)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/remove", async (req, res) => {
    try {
        let returnValue = true;

        await User.findOneAndUpdate({email: req.body.email}, {events: req.body.events}, {new: true},
            (err) => {
            if (err) returnValue = false;
        })

        res.status(201).jsonp(returnValue)
    } catch (e) {
        res.status(404).jsonp(false)
    }
})

server.post("/edit", async (req, res) => {
    try {
        let returnValue = true;
        await User.findOneAndUpdate({email: req.body.email}, {events: req.body.events}, {new: true},
            (err) => {
            if (err) {returnValue = false}
        })

        res.status(201).jsonp(returnValue)
    } catch (e) {
        res.status(404).jsonp(false)
    }
});

async function start() {
    try{
        httpServer.listen(PORT, () => console.log(`Do it! Port: ${PORT}`))
    } catch (err) {
        console.log('Error', err.message)
        process.exit(1)
    }
}

start()
