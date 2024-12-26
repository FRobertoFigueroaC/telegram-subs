export interface CreateChannelDTO {
    adminId: number;
    telegramChannelId?: bigint | null; 
    channelName: string;
}

export interface ChannelResponseDTO {
    id: number;
    adminId: number;
    telegramChannelId?: bigint | null; 
    channelName: string;
    createdAt: Date;
    updatedAt: Date;
}