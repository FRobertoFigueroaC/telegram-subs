import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';

import { handleBigIntMiddleware } from './middlewares';


import telegramRoutes from './routes/telegram-routes';
import userRoutes from './routes/user-routes'


const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear cuerpos JSON
app.use( express.json() );
app.use( handleBigIntMiddleware );

app.listen( PORT, () => console.log( `Servidor corriendo en el puerto ${ PORT }` ) );

app.use( '/api/telegram', telegramRoutes );
app.use( '/api/users', userRoutes );

