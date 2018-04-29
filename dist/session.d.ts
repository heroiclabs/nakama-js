export declare class Session {
    readonly token: string;
    readonly created_at: number;
    readonly expires_at: number;
    readonly username: string;
    readonly user_id: string;
    private constructor();
    isexpired(currenttime: number): boolean;
    static restore(jwt: string): Session;
}
