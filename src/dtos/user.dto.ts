export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'subscriber';
    telegramUserId?: bigint | null;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'subscriber';
    telegramUserId?: bigint | null;
}

export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'subscriber';
    telegramUserId?: bigint | null; 
    createdAt: Date;
    updatedAt: Date;
}