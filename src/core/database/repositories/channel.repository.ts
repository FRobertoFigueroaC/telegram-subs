import { prisma } from '../prisma-client';
import { CreateChannelDTO } from '../../../dtos/channel.dto';

export class ChannelRepository {
    static async findById( id: number ) {
        return prisma.channel.findUnique( {
            where: { id },
        } );
    }

    static async create( data: CreateChannelDTO ) {
        return prisma.channel.create( {
            data,
        } );
    }
}