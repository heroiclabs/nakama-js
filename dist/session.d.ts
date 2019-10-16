export interface ISession {
    readonly token: string;
    readonly created_at: number;
    readonly expires_at: number;
    readonly username: string;
    readonly user_id: string;
    isexpired(currenttime: number): boolean;
}
export declare class Session {
    readonly token: string;
    readonly created_at: number;
    readonly expires_at: number;
    readonly username: string;
    readonly user_id: string;
    constructor(token: string, created_at: number, expires_at: number, username: string, user_id: string);
    isexpired(currenttime: number): boolean;
    static restore(jwt: string): Session;
}
