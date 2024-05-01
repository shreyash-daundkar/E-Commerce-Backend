import express, { Express, Request, Response, NextFunction } from 'express';

import { PORT } from './utils/variables';

const app: Express = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Working');
});

app.listen(PORT, () => console.log('App running on port 3000'));