import axios from 'axios';

export class TelegramService {
    private readonly apiUrl: string;
    private readonly botToken: string;

    constructor() {
        this.apiUrl = process.env.TELEGRAM_API_URL || 'https://api.telegram.org/bot';
        this.botToken = process.env.TELEGRAM_BOT_TOKEN as string;

        if ( !this.botToken ) {
            throw new Error( 'TELEGRAM_BOT_TOKEN is not set in environment variables' );
        }
    }
    /**
     * Enviar un mensaje a un usuario o grupo.
     * @param chatId - ID del chat o canal.
     * @param message - Mensaje a enviar.
     */
    async sendMessage( chatId: string | number, message: string ): Promise<void> {
        try {
            const url = `${ this.apiUrl }${ this.botToken }/sendMessage`;
            await axios.post( url, {
                chat_id: chatId,
                text: message,
            } );
        } catch ( error: any ) {
            console.error( 'Error in sendMessage:', error.message );
            throw new Error( error.response?.data?.description || 'Failed to send message' );
        }
    }

}