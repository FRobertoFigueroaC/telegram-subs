import { ChannelRepository } from '../database/repositories/channel.repository';
import { CreateChannelDTO, ChannelResponseDTO } from '../../dtos/channel.dto';

export class ChannelService {
    static async getChannelById( id: number ): Promise<ChannelResponseDTO | null> {
        const channel = await ChannelRepository.findById( id );
        if ( !channel ) return null;

        return {
            id: channel.id,
            adminId: channel.adminId,
            telegramChannelId: channel.telegramChannelId,
            channelName: channel.channelName,
            createdAt: channel.createdAt,
            updatedAt: channel.updatedAt,
        };
    }

    static async createChannel( data: CreateChannelDTO ): Promise<ChannelResponseDTO> {
        const channel = await ChannelRepository.create( data );
        return {
            id: channel.id,
            adminId: channel.adminId,
            telegramChannelId: channel.telegramChannelId,
            channelName: channel.channelName,
            createdAt: channel.createdAt,
            updatedAt: channel.updatedAt,
        };
    }
}