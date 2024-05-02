import express, { Express } from 'express';
import { PORT } from './utils/variables';
import indexRouter from './routes';

const app: Express = express();

app.use(express.json());

app.use('/api', indexRouter);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));