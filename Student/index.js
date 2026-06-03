const express = require('express')
const app = express()

app.post('/studentlogin', (req, res) => {
    res.send('<html><body>INSIDE STUDENT LOGIN API...<body><hmtl>')
});

// view API
app.get('/viewassignment', (req, res) => {
    res.send('<html><body>INSIDE STUDENT VIEW ASSIGNMENT API...<body><hmtl>')
});

// update API
app.put('/studentupdateprofile', (req, res) => {
    res.send('<html><body>INSIDE UPDATE PROFILE API...<body><hmtl>')
});

// submite API
app.post('/submitassignment', (req, res) => {
    res.send('<html><body>INSIDE SUBMIT ASSIGNMENT API...<body><hmtl>')
});

// start the express server. 5000 is the port number
app.listen(5000, () => 
    console.log('EXPRESS Server STARTED at PORT No: 5000'));