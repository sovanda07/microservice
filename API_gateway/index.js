const express = require('express');
const app = express();

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// VERIFY TOKEN
function authToken(req, res, next) {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // No token provided
    if (!token) {
        return res.status(401).send("Please send token");
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {

        // Invalid token
        if (err) {
            return res.status(403).send("Invalid token");
        }

        req.user = user;
        next();
    });
}

// VERIFY ROLE
function authRole(role) {
    return (req, res, next) => {

        if (req.user.role !== role) {
            return res.status(403).send("Unauthorized");
        }

        next();
    };
}

// STUDENT SERVICE
app.use('/student', authToken, authRole('student'), (req, res) => {
        console.log("INSIDE API GATEWAY STUDENT ROUTE");
        proxy.web(req, res, { target: 'http://localhost:5000'});
});

// TEACHER SERVICE
app.use('/teacher', authToken, authRole('teacher'), (req, res) => {
        console.log("INSIDE API GATEWAY TEACHER ROUTE");
        proxy.web(req, res, { target: 'http://localhost:5001' });
});

// REGISTRATION SERVICE
app.use('/registration', (req, res) => {
    console.log("INSIDE API GATEWAY REGISTRATION ROUTE");
    proxy.web(req, res, { target: 'http://localhost:5002' });
});

// AUTHENTICATION SERVICE
app.use('/authentication', (req, res) => {
    console.log("INSIDE API GATEWAY AUTHENTICATION ROUTE");
    proxy.web(req, res, { target: 'http://localhost:5003' });
});

app.listen(4000, () => {
    console.log("API GATEWAY Service is running on PORT NO:", 4000);
});