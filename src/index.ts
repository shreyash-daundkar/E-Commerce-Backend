import express, { Express, Request, Response, NextFunction } from 'express'

const app: Express = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Working');
});

app.listen(3000, () => console.log('App running on port 3000'));