/**
 * Tutor
 * A Tutor
 */
declare interface Tutor {
    id?: number;
    bio?: string | null;
    courseId: number;
    createdOn: string;
    mailSubscription: number;
    modifiedOn: string;
    tutorId: number;
    websites?: string | null;
}
export { Tutor };
