/**
 * DeactivatedUser
 * A DeactivatedUser
 */
declare interface DeactivatedUser {
    id?: number;
    deactivatedOn?: string | null;
    email?: string | null;
    firstName?: string | null;
    isEmailVerified?: number | null;
    isMobileVerified?: number | null;
    lastName?: string | null;
    mobileNo?: number | null;
    password?: string | null;
    status?: number | null;
    type?: string | null;
    uid?: number | null;
    usageDays?: number | null;
}
export { DeactivatedUser };
