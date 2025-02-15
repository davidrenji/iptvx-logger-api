import express from 'express';
import cors from 'cors';
import loggerRoute from './routes/logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3200;

app.use(cors());
app.use(express.json());

app.use('/', loggerRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
