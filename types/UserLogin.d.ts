/**
 * UserLogin
 * A UserLogin
 */
declare interface UserLogin {
    id?: number;
    email: string;
    loggedIn: string;
    loggedOut?: string | null;
    token: string;
}
export { UserLogin };
