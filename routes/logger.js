const express = require('express');
const { PrismaClient } = require('@prisma/client');
const winston = require('winston');

const router = express.Router();
const prisma = new PrismaClient();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

router.post('/logger', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token === process.env.API_KEY_SECRET) {
            const { message } = req.body;
            if (message) {
                const logMessage = {
                    message: req.body.message,
                    timestamp: new Date().toISOString()
                };
                logger.warn(logMessage);

                try {
                    const result = await prisma.logger.create({
                        data: { message }
                    });
                    res.status(200).send(`Message logged with ID: ${result.id}`);
                } catch (error) {
                    console.error('Error saving message to database:', error);
                    res.status(500).send('Internal Server Error');
                }
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

module.exports = router;
