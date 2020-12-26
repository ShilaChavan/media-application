const IpLocate = require('node-iplocate');
const publicIp = require('public-ip');
const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

exports.weather = async (req, res) => {
    publicIp.v4().then(ip => {
        IpLocate(ip).then((result) => {
            if (!result) res.status(401).send('No Result');
            else {
                let searchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${result.city}&APPID=be625eff2a51656165b22a06fc5a7241`;
                return axios.get(`${searchUrl}`)
                    .then(response => {
                        const responseJSON = response.data;
                        res.status(201).send({ 'Your Location': result.city, 'Weather Details': responseJSON })
                    })
                    .catch(err => {
                        return res.json(err.response.data);
                    });
            }
        })
    })
}


exports.email = (req, res) => {
    const msg = {
        to: 'shilachavan206@gmail.com',
        from: 'shilac2002@gmail.com',
        subject: 'Media-App | User-Query',
        text: 'You have received new query from'
    }

    if (!req.body.email || !req.body.query)
        res.status(400).json('Email is not availble for this user!');
    const mailHtml = `<p>
    user-Email: ${req.body.email}<br>
    user-query: ${req.body.query}<br>
    </p>`

    msg.html = `<p>${msg.text}</p>${mailHtml}`;
    sgMail.send(msg)
    res.status(201).json({ message: 'Query Send Successfully!' })
}