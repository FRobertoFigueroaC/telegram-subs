import { prisma } from '../prisma-client';
import { CreateUserDTO, UpdateUserDTO } from '../../../dtos/user.dto';

export class UserRepository {
    static async findById( id: number ) {
        return prisma.user.findUnique( {
            where: { id },
        } );
    }

    static async create( data: CreateUserDTO ) {
        return prisma.user.create( {
            data,
        } );
    }

    static async update( id: number, data: UpdateUserDTO ) {
        return prisma.user.update( {
            where: { id },
            data,
        } );
    }

    static async delete( id: number ) {
        return prisma.user.delete( {
            where: { id },
        } );
    }
}