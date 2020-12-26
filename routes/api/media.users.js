const express = require('express');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./../../config/auth/authToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../../config');
const User = require('./../../models/media.users');

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) {
            res.status(401).send({ Message: 'Email not found, try again ...' });
        } else {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            var token = jwt.sign({ id: user._id }, config.auth.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            localStorage.setItem('authtoken', token)

            // if (user.role == 'admin') {
            res.status(201).send({ Message: "User Login Successful!", token })
            // } else {

            // }
        }
    });
}

exports.register = (req, res) => {          //normal user registration
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) { //add new user
            const hashedPasword = bcrypt.hashSync(req.body.password, 8);
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPasword,
                role: "normal"
            }, (err, user) => {
                if (err) return res.status(500).send({ Message: 'There was a problem registering user' });
                res.status(201).send({ Message: 'User Registered!' });
            })
        } else {
            res.status(401).send({ Message: 'Existing user! Please enter a new one ...' });

        }
    })
}

exports.adminRegister = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        let htmlMsg
        if (!user) { //add new user
            const hashedPasword = bcrypt.hashSync(req.body.password, 8);
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPasword,
                role: req.body.role || 'admin'
            }, (err, user) => {
                if (err) return res.status(500).send('There was a problem registering user');
                res.status(201).send({ Message: 'Admin Added' });
            })
        } else { //duplicate
            res.status(401).send({ Message: 'Email existing, please enter a new one ...' })
        }
    });
}
