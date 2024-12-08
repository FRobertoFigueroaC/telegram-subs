export interface User {
    id: number;
    telegram_id: number;
    subscription_end: string | Date;
    subscription_status: boolean;
}