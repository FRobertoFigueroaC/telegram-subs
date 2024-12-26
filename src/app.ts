import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';

import telegramRoutes from './routes/telegram-routes';


const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear cuerpos JSON
app.use( express.json() );

app.get( '/', ( req: Request, res: Response ) => {
    res.send( '¡Hola, TypeScript con Node.js!' );
} );

app.listen( PORT, () => console.log( `Servidor corriendo en el puerto ${ PORT }` ) );

app.use( '/api/telegram', telegramRoutes );

