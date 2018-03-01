export declare class Session {
    readonly token: string;
    readonly createdAt: number;
    readonly expiresAt: number;
    readonly username: string;
    readonly userId: string;
    private constructor();
    isexpired(currenttime: number): boolean;
    static restore(jwt: string): Session;
}
