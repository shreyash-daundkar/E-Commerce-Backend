import express, { Express } from 'express';
import { PORT } from './utils/variables';
import indexRouter from './routes';
import errorMiddleware from './middlewares/error';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan'

const app: Express = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

app.use('/api', indexRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));