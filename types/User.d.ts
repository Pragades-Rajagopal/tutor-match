/**
 * User
 * A User
 */
declare interface User {
    id?: number;
    createdOn: string;
    email: string;
    firstName: string;
    isEmailVerified: number;
    isMobileVerified: number;
    lastName: string;
    mobileNo: number;
    modifiedOn: string;
    password: string;
    status: number;
    type: string;
}
export { User };
