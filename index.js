const express = require('express')
const basicAuth = require('express-basic-auth')
const logger = require('./log/logger')
const httpLogger = require('./log/httpLogger')

const app = express()
const httpPort = 8080
const isUseAuth = false

app.use(express.json())
app.use(httpLogger)

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

app.get('/auth', (req, res) => {
    logger.info(req.body)
    const logins = {
        'login': 'demo',
        'password': '5566'
    }
    if (req.body) {
        if (logins.password === req.body.password && logins.login === req.body.login) {
            res.json({
                "result": "success",
                "message": ""
            })
        } else {
            res.status(400)
            res.json({
                "result": "failed",
                "message": "Credentials are wrong"
            })
        }
    } else {
        res.status(400)
        res.json({
            "result": "failed",
            "message": "Request body is wrong"
        })
    }
})

app.listen(httpPort, () =>
    logger.info(`Express.js listening on port ${httpPort}`))
