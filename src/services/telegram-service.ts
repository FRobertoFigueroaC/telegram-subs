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

    /**
 * Agregar un usuario a un canal.
 * @param channelId - ID o username del canal.
 * @param userId - ID del usuario.
 */
    async addUserToChannel( channelId: string, userId: number ): Promise<void> {
        try {
            const url = `${ this.apiUrl }${ this.botToken }/inviteToChannel`;
            await axios.post( url, {
                channel: channelId,
                users: [ userId ],
            } );
        } catch ( error ) {
            console.error( 'Error al agregar usuario al canal:', error );
            throw new Error( 'No se pudo agregar al usuario al canal.' );
        }
    }

    /**
     * Obtener información de un usuario.
     * @param userId - ID del usuario.
     * @returns Información del usuario.
     */
    async getUserInfo( userId: number ): Promise<any> {
        try {
            const url = `${ this.apiUrl }${ this.botToken }/getChat`;
            const response = await axios.post( url, {
                chat_id: userId,
            } );
            return response.data;
        } catch ( error ) {
            console.error( 'Error al obtener información del usuario:', error );
            throw new Error( 'No se pudo obtener la información del usuario.' );
        }
    }

    /**
     * Eliminar a un usuario de un canal.
     * @param channelId - ID o username del canal.
     * @param userId - ID del usuario.
     */
    async removeUserFromChannel( channelId: string, userId: number ): Promise<void> {
        try {
            const url = `${ this.apiUrl }${ this.botToken }/kickChatMember`;
            await axios.post( url, {
                chat_id: channelId,
                user_id: userId,
            } );
        } catch ( error ) {
            console.error( 'Error al eliminar usuario del canal:', error );
            throw new Error( 'No se pudo eliminar al usuario del canal.' );
        }
    }

}