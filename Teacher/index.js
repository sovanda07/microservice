const express = require('express')
const app = express()

app.post('/addassignment', (req, res) => {
    res.send('<html><body>INSIDE TEACHER ADD ASSIGNMENT API...<body><hmtl>')
});

// view API
app.get('/searchstudent', (req, res) => {
    res.send('<html><body>INSIDE TEACHER SEARCH STUDENT API...<body><hmtl>')
});

// update API
app.delete('/removeassignment', (req, res) => {
    res.send('<html><body>INSIDE TEACHER REMOVE ASSIGNMENT API...<body><hmtl>')
});

// start the express server. 5001 is the port number
app.listen(5001, () => 
    console.log('EXPRESS Server STARTED at PORT No: 5001'));