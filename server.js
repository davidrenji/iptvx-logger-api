const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3200;
const apiKeySecret = process.env.API_KEY_SECRET;

app.use(cors());
app.use(express.json());

app.post('/logger', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token === apiKeySecret) {
            const { message } = req.body;
            if (message) {
                console.log(message);
                res.status(200).send('Message logged');
            } else {
                res.status(400).send('Message parameter is missing');
            }
        } else {
            res.status(403).send('Forbidden: Invalid API key');
        }
    } else {
        res.status(401).send('Unauthorized: Missing or invalid Authorization header');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
