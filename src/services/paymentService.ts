import Stripe from 'stripe';
import paypal, { Payment, PaymentResponse } from 'paypal-rest-sdk';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';


const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string );

paypal.configure( {
    mode: 'sandbox', // or 'live'
    client_id: process.env.PAYPAL_CLIENT_ID as string,
    client_secret: process.env.PAYPAL_CLIENT_SECRET as string,
} );

const mercadoPagoClient = new MercadoPagoConfig( {
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
} );



export const createStripePayment = async ( amount: number ): Promise<Stripe.PaymentIntent> => {
    return await stripe.paymentIntents.create( {
        amount: amount * 100, // Stripe expects the amount in cents
        currency: 'usd',
    } );
};

export const createPayPalPayment = async ( amount: number ): Promise<PaymentResponse> => {
    const payment: Payment = {
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        transactions: [
            {
                amount: { total: amount.toFixed( 2 ), currency: 'USD' },
                description: 'Subscription Payment',
            },
        ],
        redirect_urls: {
            return_url: 'http://yourdomain.com/success',
            cancel_url: 'http://yourdomain.com/cancel',
        },
    };

    return new Promise( ( resolve, reject ) => {
        paypal.payment.create(
            payment,
            ( err: paypal.SDKError | null, payment: PaymentResponse | undefined ) => {
                if ( err ) {
                    reject( err );
                } else if ( payment ) {
                    resolve( payment );
                } else {
                    reject( new Error( 'Unknown error occurred during PayPal payment creation' ) );
                }
            }
        );
    } );
};

export const createMercadoPagoPayment = async ( amount: number ): Promise<any> => {
    const payment = new MercadoPagoPayment( mercadoPagoClient );

    const body = {
        transaction_amount: amount,
        description: 'Subscription Payment',
        payment_method_id: 'visa', // Replace with actual payment method
        payer: {
            email: 'test_user@test.com', // Replace with actual payer email
        },
    };

    try {
        const response = await payment.create( { body } );
        return response;
    } catch ( error ) {
        console.error( 'Error creating MercadoPago payment:', error );
        throw new Error( 'Failed to create MercadoPago payment' );
    }
};
