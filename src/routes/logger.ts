import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import winston from 'winston';

const router = Router();
const prisma = new PrismaClient();

router.post('/logger', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token === process.env.API_KEY_SECRET) {
            const { message, deviceId } = req.body;
            if (message) {
                const logMessage = {
                    message,
                    deviceId,
                    timestamp: new Date().toISOString()
                };
                console.log(logMessage);

                try {
                    const result = await prisma.logger.create({
                        data: { message, deviceId }
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

export default router;
