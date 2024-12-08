import express, { Application, Request, Response } from 'express';
// import paymentRoutes from './routes/paymentRoutes';
import telegramRoutes from './routes/telegramRoutes';


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.get( '/', ( req: Request, res: Response ) => {
    res.send( '¡Hola, TypeScript con Node.js!' );
} );

app.listen( PORT, () => console.log( `Servidor corriendo en el puerto ${ PORT }` ) );
// app.use( '/api/payments', paymentRoutes );
app.use( '/api/telegram', telegramRoutes );

