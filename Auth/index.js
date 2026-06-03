const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const PersonModel = require('./schema.js');
const dbconnect = require('./DBconnect.js');

// LOGIN API
app.post("/login", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Login using either name+password OR email+password
        const user = await PersonModel.findOne({
            password: password,
            $or: [
                { name: name },
                { email: email }
            ]
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid username/email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            JWT_SECRET_KEY,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error"
        });
    }
});

app.listen(5003, () => {
    console.log('Authentication Service Server is running on PORT NO: 5003');
});