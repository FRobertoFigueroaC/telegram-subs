// src/routes/telegramRoutes.ts
import express, { Request, Response } from 'express';
import { addUserToChannel, removeUserFromChannel, sendNotification } from '../services/telegramService';

const router = express.Router();

/**
 * Ruta para agregar un usuario a un canal
 * @route POST /api/telegram/addUser
 */
router.post( '/addUser', async ( req: Request, res: Response ): Promise<void> => {
    try {
        const { userId, channelId } = req.body;

        if ( !userId || !channelId ) {
            res.status( 400 ).json( { error: 'Se requieren los parámetros userId y channelId' } );
            return;
        }

        await addUserToChannel( userId, channelId );

        res.json( { message: `Usuario ${ userId } agregado al canal ${ channelId }` } );
    } catch ( error: any ) {
        res.status( 500 ).json( { error: error.message } );
    }
} );

/**
 * Ruta para eliminar a un usuario de un canal
 * @route POST /api/telegram/removeUser
 */
router.post( '/removeUser', async ( req: Request, res: Response ): Promise<void> => {
    const { userId, channelId } = req.body;

    if ( !userId || !channelId ) {
        res.status( 400 ).json( { error: 'Se requieren los parámetros userId y channelId' } );
        return;
    }

    try {
        await removeUserFromChannel( userId, channelId );
        res.json( { message: `Usuario ${ userId } eliminado del canal ${ channelId }` } );
    } catch ( error ) {
        res.status( 500 ).json( { error: error } );
    }
} );

/**
 * Ruta para enviar una notificación a un usuario
 * @route POST /api/telegram/sendNotification
 */
router.post( '/sendNotification', async ( req: Request, res: Response ): Promise<void> => {
    const { chatId, message } = req.body;

    if ( !chatId || !message ) {
        res.status( 400 ).json( { error: 'Se requieren los parámetros chatId y message' } );
        return;
    }

    try {
        await sendNotification( chatId, message );
        res.json( { message: `Notificación enviada al usuario con chatId ${ chatId }` } );
    } catch ( error ) {
        res.status( 500 ).json( { error: error } );
    }
} );

export default router;
