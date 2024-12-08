// src/services/telegramService.ts
const MTProto: any = require( '@mtproto/core' );
import TelegramBot from 'node-telegram-bot-api';

const mtproto = new MTProto( {
    api_id: parseInt( process.env.TELEGRAM_API_ID as string ),
    api_hash: process.env.TELEGRAM_API_HASH as string,
} );

const botClient = new TelegramBot( process.env.TELEGRAM_BOT_TOKEN as string, { polling: true } );

export const addUserToChannel = async ( userId: number, channelId: string ): Promise<void> => {
    await mtproto.call( 'channels.inviteToChannel', {
        channel: channelId,
        users: [ userId ],
    } );
};

export const removeUserFromChannel = async ( userId: number, channelId: string ): Promise<void> => {
    await mtproto.call( 'channels.kickFromChannel', {
        channel: channelId,
        user_id: userId,
    } );
};

export const sendNotification = async ( chatId: number, message: string ): Promise<void> => {
    await botClient.sendMessage( chatId, message );
};
