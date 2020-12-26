const dbJSON = require('./db');
const httpJSON = require('./http');
const authHttp = require('./auth.json');

const env = process.env.NODE_ENV || 'development';

const db = dbJSON[env];
const http = httpJSON[env];
const auth = authHttp[env];


module.exports = { env, db, http, auth };
