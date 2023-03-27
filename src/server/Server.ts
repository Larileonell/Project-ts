import express from 'express';
import { router } from './routes/index';
import 'dotenv/config'
import './shared/services/translationsYup'
const server = express();


server.use(router);



export { server };
