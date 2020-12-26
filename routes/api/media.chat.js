const Message = require('./../../models/message');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


exports.get = (req, res) => {
    Message.find({}, (err, messages) => {
        console.log(messages)
        if (err) res.status(400).send(err);

        res.status(201).send(messages);
    });
}

exports.getUserMsg = (req, res) => {
    const user = req.params.user
    Message.find({ name: user }, (err, messages) => {
        if (err) res.status(400).send(err);

        res.status(201).send(messages);
    });
}

exports.message = async (req, res) => {
    try {

        var censored = await Message.findOne({ name: req.body.name });
        if (censored)
            await Message.remove({ _id: censored.id });
        else
            io.emit('message', req.body);
        Message.create(req.body, (err, msg) => {
            if (err) return res.status(500).send('There was a problem with adding chat');
            res.status(201).send({ message: req.body });
        })
    }
    catch (error) {
        res.sendStatus(500);
        return console.log('error', error);
    }
    finally {
        console.log('Message Posted')
    }
}
