import { Router, Request, Response } from 'express';
import { TelegramService } from '../services/telegram-service';

const router = Router();
const telegramService = new TelegramService();

/**
 * POST /api/telegram/sendMessage
 * Sends a message to a specific chat or channel.
 */
router.post( '/sendMessage', async ( req: Request, res: Response ): Promise<void> => {
    const { chatId, message } = req.body;

    try {
        if ( !chatId || !message ) {
            res.status( 400 ).json( { error: 'chatId and message are required' } );
            return;
        }

        await telegramService.sendMessage( chatId, message );
        res.status( 200 ).json( { status: 'success', message: 'Message sent successfully' } );
    } catch ( error: any ) {
        res.status( 500 ).json( { error: error.message || 'Failed to send message' } );
    }
} );

/**
 * POST /api/telegram/addUserToChannel
 * Adds a user to a Telegram channel.
 */
router.post( '/addUserToChannel', async ( req: Request, res: Response ): Promise<void> => {
    const { channelId, userId } = req.body;

    try {
        if ( !channelId || !userId ) {
            res.status( 400 ).json( { error: 'channelId and userId are required' } );
            return;
        }

        await telegramService.addUserToChannel( channelId, userId );
        res.status( 200 ).json( { status: 'success', message: `User ${ userId } added to channel ${ channelId }` } );
    } catch ( error: any ) {
        res.status( 500 ).json( { error: error.message || 'Failed to add user to channel' } );
    }
} );

/**
 * GET /api/telegram/getUserInfo
 * Retrieves information about a Telegram user.
 */
router.get( '/getUserInfo', async ( req: Request, res: Response ): Promise<void> => {
    const { userId } = req.query;

    try {
        if ( !userId ) {
            res.status( 400 ).json( { error: 'userId is required' } );
            return;
        }

        const userInfo = await telegramService.getUserInfo( Number( userId ) );
        res.status( 200 ).json( { status: 'success', data: userInfo } );
    } catch ( error: any ) {
        res.status( 500 ).json( { error: error.message || 'Failed to retrieve user information' } );
    }
} );

/**
 * POST /api/telegram/removeUserFromChannel
 * Removes a user from a Telegram channel.
 */
router.post( '/removeUserFromChannel', async ( req: Request, res: Response ): Promise<void> => {
    const { channelId, userId } = req.body;

    try {
        if ( !channelId || !userId ) {
            res.status( 400 ).json( { error: 'channelId and userId are required' } );
            return;
        }

        await telegramService.removeUserFromChannel( channelId, userId );
        res.status( 200 ).json( { status: 'success', message: `User ${ userId } removed from channel ${ channelId }` } );
    } catch ( error: any ) {
        res.status( 500 ).json( { error: error.message || 'Failed to remove user from channel' } );
    }
} );

export default router;