import { UserRepository } from '../database/repositories/user.repository';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../../dtos/user.dto';

export class UserService {
    static async getUserById( id: number ): Promise<UserResponseDTO | null> {
        const user = await UserRepository.findById( id );
        if ( !user ) return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            telegramUserId: user.telegramUserId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static async createUser( data: CreateUserDTO ): Promise<UserResponseDTO> {
        const user = await UserRepository.create( data );
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            telegramUserId: user.telegramUserId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    static async updateUser( id: number, data: UpdateUserDTO ): Promise<UserResponseDTO> {
        const user = await UserRepository.update( id, data );
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            telegramUserId: user.telegramUserId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}