"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/logger', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                console.log(logMessage);
                try {
                    const result = yield prisma.logger.create({
                        data: { message }
                    });
                    res.status(200).send(`Message logged with ID: ${result.id}`);
                }
                catch (error) {
                    console.error('Error saving message to database:', error);
                    res.status(500).send('Internal Server Error');
                }
            }
            else {
                res.status(400).send('Message parameter is missing');
            }
        }
        else {
            res.status(403).send('Forbidden: Invalid API key');
        }
    }
    else {
        res.status(401).send('Unauthorized: Missing or invalid Authorization header');
    }
}));
exports.default = router;
