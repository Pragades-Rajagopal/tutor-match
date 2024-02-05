/**
 * TutorRequest
 * A TutorRequest
 */
declare interface TutorRequest {
    id?: number;
    createdOn: string;
    studentId: number;
    studentReqHide: number;
    tutorId: number;
    tutorReqHide: number;
}
export { TutorRequest };
