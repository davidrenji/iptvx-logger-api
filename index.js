const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/logger', (req, res) => {
    const { message } = req.body;
    if (message) {
        console.log(message);
        res.status(200).send('Message logged');
    } else {
        res.status(400).send('Message parameter is missing');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
