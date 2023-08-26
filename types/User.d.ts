/**
 * User
 * A User
 */
declare interface User {
    sId?: number;
    createdOn: string;
    email: string;
    firstName: string;
    id: string;
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
