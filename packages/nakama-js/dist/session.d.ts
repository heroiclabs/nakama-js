export interface ISession {
    token: string;
    created: boolean;
    readonly created_at: number;
    expires_at?: number;
    refresh_expires_at?: number;
    refresh_token: string;
    username?: string;
    user_id?: string;
    vars?: object;
    isexpired(currenttime: number): boolean;
    isrefreshexpired(currenttime: number): boolean;
}
export declare class Session implements ISession {
    readonly created: boolean;
    token: string;
    readonly created_at: number;
    expires_at?: number;
    refresh_expires_at?: number;
    refresh_token: string;
    username?: string;
    user_id?: string;
    vars?: object;
    constructor(token: string, refresh_token: string, created: boolean);
    isexpired(currenttime: number): boolean;
    isrefreshexpired(currenttime: number): boolean;
    update(token: string, refreshToken: string): void;
    static restore(token: string, refreshToken: string): Session;
}
