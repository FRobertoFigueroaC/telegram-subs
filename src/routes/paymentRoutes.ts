// src/routes/paymentRoutes.ts
import express, { Request, Response } from 'express';
import { 
    createStripePayment,
    createPayPalPayment, 
    // createMercadoPagoPayment
} from '../services/paymentService';

const router = express.Router();

router.post( '/stripe', async ( req: Request, res: Response ) => {
    try {
        const { amount } = req.body;
        const payment = await createStripePayment( amount );
        res.json( payment );
    } catch ( error ) {
        res.status( 500 ).json( { error: error } );
    }
} );

router.post( '/paypal', async ( req: Request, res: Response ) => {
    try {
        const { amount } = req.body;
        const payment = await createPayPalPayment( amount );
        res.json( payment );
    } catch ( error ) {
        res.status( 500 ).json( { error: error } );
    }
} );

// router.post( '/mercadopago', async ( req: Request, res: Response ) => {
//     try {
//         const { amount } = req.body;
//         const payment = await createMercadoPagoPayment( amount );
//         res.json( payment );
//     } catch ( error ) {
//         res.status( 500 ).json( { error: error } );
//     }
// } );

export default router;
