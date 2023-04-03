import express, {json} from 'express';
import cors from 'cors';
import { routes } from './routes.js';

const server = express();

server.use(json());

server.use(cors());

server.use(routes);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
})