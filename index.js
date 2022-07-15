const express = require('express')
const basicAuth = require('express-basic-auth')
const slowDown = require("express-slow-down");
const logger = require('./log/logger')
const httpLogger = require('./log/httpLogger')

const app = express()
const httpPort = 8080
const isUseAuth = false
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    // delayAfter: 1, // allow 100 requests per 15 minutes, then...
    delayMs: 3000 // begin adding 500ms of delay per request above 100:
});
app.use(httpLogger)
app.use(speedLimiter);

if (isUseAuth) {
    app.use(basicAuth({
        users: {'login': 'password'},
        unauthorizedResponse: getUnauthorizedResponse
    }))
}

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

app.listen(httpPort, () =>
    logger.info(`Express.js listening on port ${httpPort}`))
