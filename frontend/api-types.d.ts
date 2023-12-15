interface FullResponse<T> {
  'statusCode': number;
  'headers': object;
  'body': T;
}

interface GetUsersRequest {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<string>;
  'where.createdOn.eq'?: string;
  'where.createdOn.neq'?: string;
  'where.createdOn.gt'?: string;
  'where.createdOn.gte'?: string;
  'where.createdOn.lt'?: string;
  'where.createdOn.lte'?: string;
  'where.createdOn.like'?: string;
  'where.createdOn.in'?: string;
  'where.createdOn.nin'?: string;
  'where.createdOn.contains'?: string;
  'where.createdOn.contained'?: string;
  'where.createdOn.overlaps'?: string;
  'where.modifiedOn.eq'?: string;
  'where.modifiedOn.neq'?: string;
  'where.modifiedOn.gt'?: string;
  'where.modifiedOn.gte'?: string;
  'where.modifiedOn.lt'?: string;
  'where.modifiedOn.lte'?: string;
  'where.modifiedOn.like'?: string;
  'where.modifiedOn.in'?: string;
  'where.modifiedOn.nin'?: string;
  'where.modifiedOn.contains'?: string;
  'where.modifiedOn.contained'?: string;
  'where.modifiedOn.overlaps'?: string;
  'where.status.eq'?: number;
  'where.status.neq'?: number;
  'where.status.gt'?: number;
  'where.status.gte'?: number;
  'where.status.lt'?: number;
  'where.status.lte'?: number;
  'where.status.like'?: number;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.type.eq'?: string;
  'where.type.neq'?: string;
  'where.type.gt'?: string;
  'where.type.gte'?: string;
  'where.type.lt'?: string;
  'where.type.lte'?: string;
  'where.type.like'?: string;
  'where.type.in'?: string;
  'where.type.nin'?: string;
  'where.type.contains'?: string;
  'where.type.contained'?: string;
  'where.type.overlaps'?: string;
  'where.email.eq'?: string;
  'where.email.neq'?: string;
  'where.email.gt'?: string;
  'where.email.gte'?: string;
  'where.email.lt'?: string;
  'where.email.lte'?: string;
  'where.email.like'?: string;
  'where.email.in'?: string;
  'where.email.nin'?: string;
  'where.email.contains'?: string;
  'where.email.contained'?: string;
  'where.email.overlaps'?: string;
  'where.firstName.eq'?: string;
  'where.firstName.neq'?: string;
  'where.firstName.gt'?: string;
  'where.firstName.gte'?: string;
  'where.firstName.lt'?: string;
  'where.firstName.lte'?: string;
  'where.firstName.like'?: string;
  'where.firstName.in'?: string;
  'where.firstName.nin'?: string;
  'where.firstName.contains'?: string;
  'where.firstName.contained'?: string;
  'where.firstName.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.isEmailVerified.eq'?: number;
  'where.isEmailVerified.neq'?: number;
  'where.isEmailVerified.gt'?: number;
  'where.isEmailVerified.gte'?: number;
  'where.isEmailVerified.lt'?: number;
  'where.isEmailVerified.lte'?: number;
  'where.isEmailVerified.like'?: number;
  'where.isEmailVerified.in'?: string;
  'where.isEmailVerified.nin'?: string;
  'where.isEmailVerified.contains'?: string;
  'where.isEmailVerified.contained'?: string;
  'where.isEmailVerified.overlaps'?: string;
  'where.isMobileVerified.eq'?: number;
  'where.isMobileVerified.neq'?: number;
  'where.isMobileVerified.gt'?: number;
  'where.isMobileVerified.gte'?: number;
  'where.isMobileVerified.lt'?: number;
  'where.isMobileVerified.lte'?: number;
  'where.isMobileVerified.like'?: number;
  'where.isMobileVerified.in'?: string;
  'where.isMobileVerified.nin'?: string;
  'where.isMobileVerified.contains'?: string;
  'where.isMobileVerified.contained'?: string;
  'where.isMobileVerified.overlaps'?: string;
  'where.lastName.eq'?: string;
  'where.lastName.neq'?: string;
  'where.lastName.gt'?: string;
  'where.lastName.gte'?: string;
  'where.lastName.lt'?: string;
  'where.lastName.lte'?: string;
  'where.lastName.like'?: string;
  'where.lastName.in'?: string;
  'where.lastName.nin'?: string;
  'where.lastName.contains'?: string;
  'where.lastName.contained'?: string;
  'where.lastName.overlaps'?: string;
  'where.mobileNo.eq'?: number;
  'where.mobileNo.neq'?: number;
  'where.mobileNo.gt'?: number;
  'where.mobileNo.gte'?: number;
  'where.mobileNo.lt'?: number;
  'where.mobileNo.lte'?: number;
  'where.mobileNo.like'?: number;
  'where.mobileNo.in'?: string;
  'where.mobileNo.nin'?: string;
  'where.mobileNo.contains'?: string;
  'where.mobileNo.contained'?: string;
  'where.mobileNo.overlaps'?: string;
  'where.password.eq'?: string;
  'where.password.neq'?: string;
  'where.password.gt'?: string;
  'where.password.gte'?: string;
  'where.password.lt'?: string;
  'where.password.lte'?: string;
  'where.password.like'?: string;
  'where.password.in'?: string;
  'where.password.nin'?: string;
  'where.password.contains'?: string;
  'where.password.contained'?: string;
  'where.password.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdOn'?: string;
  'orderby.modifiedOn'?: string;
  'orderby.status'?: string;
  'orderby.type'?: string;
  'orderby.email'?: string;
  'orderby.firstName'?: string;
  'orderby.id'?: string;
  'orderby.isEmailVerified'?: string;
  'orderby.isMobileVerified'?: string;
  'orderby.lastName'?: string;
  'orderby.mobileNo'?: string;
  'orderby.password'?: string;
}

interface GetUsersResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface CreateUserRequest {
  'id'?: number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface CreateUserResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateUsersRequest {
  'fields'?: Array<string>;
  'where.createdOn.eq'?: string;
  'where.createdOn.neq'?: string;
  'where.createdOn.gt'?: string;
  'where.createdOn.gte'?: string;
  'where.createdOn.lt'?: string;
  'where.createdOn.lte'?: string;
  'where.createdOn.like'?: string;
  'where.createdOn.in'?: string;
  'where.createdOn.nin'?: string;
  'where.createdOn.contains'?: string;
  'where.createdOn.contained'?: string;
  'where.createdOn.overlaps'?: string;
  'where.modifiedOn.eq'?: string;
  'where.modifiedOn.neq'?: string;
  'where.modifiedOn.gt'?: string;
  'where.modifiedOn.gte'?: string;
  'where.modifiedOn.lt'?: string;
  'where.modifiedOn.lte'?: string;
  'where.modifiedOn.like'?: string;
  'where.modifiedOn.in'?: string;
  'where.modifiedOn.nin'?: string;
  'where.modifiedOn.contains'?: string;
  'where.modifiedOn.contained'?: string;
  'where.modifiedOn.overlaps'?: string;
  'where.status.eq'?: number;
  'where.status.neq'?: number;
  'where.status.gt'?: number;
  'where.status.gte'?: number;
  'where.status.lt'?: number;
  'where.status.lte'?: number;
  'where.status.like'?: number;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.type.eq'?: string;
  'where.type.neq'?: string;
  'where.type.gt'?: string;
  'where.type.gte'?: string;
  'where.type.lt'?: string;
  'where.type.lte'?: string;
  'where.type.like'?: string;
  'where.type.in'?: string;
  'where.type.nin'?: string;
  'where.type.contains'?: string;
  'where.type.contained'?: string;
  'where.type.overlaps'?: string;
  'where.email.eq'?: string;
  'where.email.neq'?: string;
  'where.email.gt'?: string;
  'where.email.gte'?: string;
  'where.email.lt'?: string;
  'where.email.lte'?: string;
  'where.email.like'?: string;
  'where.email.in'?: string;
  'where.email.nin'?: string;
  'where.email.contains'?: string;
  'where.email.contained'?: string;
  'where.email.overlaps'?: string;
  'where.firstName.eq'?: string;
  'where.firstName.neq'?: string;
  'where.firstName.gt'?: string;
  'where.firstName.gte'?: string;
  'where.firstName.lt'?: string;
  'where.firstName.lte'?: string;
  'where.firstName.like'?: string;
  'where.firstName.in'?: string;
  'where.firstName.nin'?: string;
  'where.firstName.contains'?: string;
  'where.firstName.contained'?: string;
  'where.firstName.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.isEmailVerified.eq'?: number;
  'where.isEmailVerified.neq'?: number;
  'where.isEmailVerified.gt'?: number;
  'where.isEmailVerified.gte'?: number;
  'where.isEmailVerified.lt'?: number;
  'where.isEmailVerified.lte'?: number;
  'where.isEmailVerified.like'?: number;
  'where.isEmailVerified.in'?: string;
  'where.isEmailVerified.nin'?: string;
  'where.isEmailVerified.contains'?: string;
  'where.isEmailVerified.contained'?: string;
  'where.isEmailVerified.overlaps'?: string;
  'where.isMobileVerified.eq'?: number;
  'where.isMobileVerified.neq'?: number;
  'where.isMobileVerified.gt'?: number;
  'where.isMobileVerified.gte'?: number;
  'where.isMobileVerified.lt'?: number;
  'where.isMobileVerified.lte'?: number;
  'where.isMobileVerified.like'?: number;
  'where.isMobileVerified.in'?: string;
  'where.isMobileVerified.nin'?: string;
  'where.isMobileVerified.contains'?: string;
  'where.isMobileVerified.contained'?: string;
  'where.isMobileVerified.overlaps'?: string;
  'where.lastName.eq'?: string;
  'where.lastName.neq'?: string;
  'where.lastName.gt'?: string;
  'where.lastName.gte'?: string;
  'where.lastName.lt'?: string;
  'where.lastName.lte'?: string;
  'where.lastName.like'?: string;
  'where.lastName.in'?: string;
  'where.lastName.nin'?: string;
  'where.lastName.contains'?: string;
  'where.lastName.contained'?: string;
  'where.lastName.overlaps'?: string;
  'where.mobileNo.eq'?: number;
  'where.mobileNo.neq'?: number;
  'where.mobileNo.gt'?: number;
  'where.mobileNo.gte'?: number;
  'where.mobileNo.lt'?: number;
  'where.mobileNo.lte'?: number;
  'where.mobileNo.like'?: number;
  'where.mobileNo.in'?: string;
  'where.mobileNo.nin'?: string;
  'where.mobileNo.contains'?: string;
  'where.mobileNo.contained'?: string;
  'where.mobileNo.overlaps'?: string;
  'where.password.eq'?: string;
  'where.password.neq'?: string;
  'where.password.gt'?: string;
  'where.password.gte'?: string;
  'where.password.lt'?: string;
  'where.password.lte'?: string;
  'where.password.like'?: string;
  'where.password.in'?: string;
  'where.password.nin'?: string;
  'where.password.contains'?: string;
  'where.password.contained'?: string;
  'where.password.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateUsersResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetUserByIdRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface GetUserByIdResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateUserRequest {
  'fields'?: Array<string>;
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateUserResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface DeleteUsersRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface DeleteUsersResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetStudentsForUserRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface GetStudentsForUserResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetCoursesRequest {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<string>;
  'where.createdOn.eq'?: string;
  'where.createdOn.neq'?: string;
  'where.createdOn.gt'?: string;
  'where.createdOn.gte'?: string;
  'where.createdOn.lt'?: string;
  'where.createdOn.lte'?: string;
  'where.createdOn.like'?: string;
  'where.createdOn.in'?: string;
  'where.createdOn.nin'?: string;
  'where.createdOn.contains'?: string;
  'where.createdOn.contained'?: string;
  'where.createdOn.overlaps'?: string;
  'where.modifiedOn.eq'?: string;
  'where.modifiedOn.neq'?: string;
  'where.modifiedOn.gt'?: string;
  'where.modifiedOn.gte'?: string;
  'where.modifiedOn.lt'?: string;
  'where.modifiedOn.lte'?: string;
  'where.modifiedOn.like'?: string;
  'where.modifiedOn.in'?: string;
  'where.modifiedOn.nin'?: string;
  'where.modifiedOn.contains'?: string;
  'where.modifiedOn.contained'?: string;
  'where.modifiedOn.overlaps'?: string;
  'where.status.eq'?: number;
  'where.status.neq'?: number;
  'where.status.gt'?: number;
  'where.status.gte'?: number;
  'where.status.lt'?: number;
  'where.status.lte'?: number;
  'where.status.like'?: number;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.name.eq'?: string;
  'where.name.neq'?: string;
  'where.name.gt'?: string;
  'where.name.gte'?: string;
  'where.name.lt'?: string;
  'where.name.lte'?: string;
  'where.name.like'?: string;
  'where.name.in'?: string;
  'where.name.nin'?: string;
  'where.name.contains'?: string;
  'where.name.contained'?: string;
  'where.name.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdOn'?: string;
  'orderby.modifiedOn'?: string;
  'orderby.status'?: string;
  'orderby.id'?: string;
  'orderby.name'?: string;
}

interface GetCoursesResponseOK {
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface CreateCourseRequest {
  'id'?: number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface CreateCourseResponseOK {
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateCoursesRequest {
  'fields'?: Array<string>;
  'where.createdOn.eq'?: string;
  'where.createdOn.neq'?: string;
  'where.createdOn.gt'?: string;
  'where.createdOn.gte'?: string;
  'where.createdOn.lt'?: string;
  'where.createdOn.lte'?: string;
  'where.createdOn.like'?: string;
  'where.createdOn.in'?: string;
  'where.createdOn.nin'?: string;
  'where.createdOn.contains'?: string;
  'where.createdOn.contained'?: string;
  'where.createdOn.overlaps'?: string;
  'where.modifiedOn.eq'?: string;
  'where.modifiedOn.neq'?: string;
  'where.modifiedOn.gt'?: string;
  'where.modifiedOn.gte'?: string;
  'where.modifiedOn.lt'?: string;
  'where.modifiedOn.lte'?: string;
  'where.modifiedOn.like'?: string;
  'where.modifiedOn.in'?: string;
  'where.modifiedOn.nin'?: string;
  'where.modifiedOn.contains'?: string;
  'where.modifiedOn.contained'?: string;
  'where.modifiedOn.overlaps'?: string;
  'where.status.eq'?: number;
  'where.status.neq'?: number;
  'where.status.gt'?: number;
  'where.status.gte'?: number;
  'where.status.lt'?: number;
  'where.status.lte'?: number;
  'where.status.like'?: number;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.name.eq'?: string;
  'where.name.neq'?: string;
  'where.name.gt'?: string;
  'where.name.gte'?: string;
  'where.name.lt'?: string;
  'where.name.lte'?: string;
  'where.name.like'?: string;
  'where.name.in'?: string;
  'where.name.nin'?: string;
  'where.name.contains'?: string;
  'where.name.contained'?: string;
  'where.name.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateCoursesResponseOK {
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetCourseByIdRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface GetCourseByIdResponseOK {
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateCourseRequest {
  'fields'?: Array<string>;
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateCourseResponseOK {
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface DeleteCoursesRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface DeleteCoursesResponseOK {
  'id': number;
  'name': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetStudentsRequest {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<string>;
  'where.createdOn.eq'?: string;
  'where.createdOn.neq'?: string;
  'where.createdOn.gt'?: string;
  'where.createdOn.gte'?: string;
  'where.createdOn.lt'?: string;
  'where.createdOn.lte'?: string;
  'where.createdOn.like'?: string;
  'where.createdOn.in'?: string;
  'where.createdOn.nin'?: string;
  'where.createdOn.contains'?: string;
  'where.createdOn.contained'?: string;
  'where.createdOn.overlaps'?: string;
  'where.modifiedOn.eq'?: string;
  'where.modifiedOn.neq'?: string;
  'where.modifiedOn.gt'?: string;
  'where.modifiedOn.gte'?: string;
  'where.modifiedOn.lt'?: string;
  'where.modifiedOn.lte'?: string;
  'where.modifiedOn.like'?: string;
  'where.modifiedOn.in'?: string;
  'where.modifiedOn.nin'?: string;
  'where.modifiedOn.contains'?: string;
  'where.modifiedOn.contained'?: string;
  'where.modifiedOn.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.interests.eq'?: string;
  'where.interests.neq'?: string;
  'where.interests.gt'?: string;
  'where.interests.gte'?: string;
  'where.interests.lt'?: string;
  'where.interests.lte'?: string;
  'where.interests.like'?: string;
  'where.interests.in'?: string;
  'where.interests.nin'?: string;
  'where.interests.contains'?: string;
  'where.interests.contained'?: string;
  'where.interests.overlaps'?: string;
  'where.studentId.eq'?: number;
  'where.studentId.neq'?: number;
  'where.studentId.gt'?: number;
  'where.studentId.gte'?: number;
  'where.studentId.lt'?: number;
  'where.studentId.lte'?: number;
  'where.studentId.like'?: number;
  'where.studentId.in'?: string;
  'where.studentId.nin'?: string;
  'where.studentId.contains'?: string;
  'where.studentId.contained'?: string;
  'where.studentId.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdOn'?: string;
  'orderby.modifiedOn'?: string;
  'orderby.id'?: string;
  'orderby.interests'?: string;
  'orderby.studentId'?: string;
}

interface GetStudentsResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface CreateStudentRequest {
  'id'?: number;
  'studentId'?: number;
  'interests'?: string;
  'createdOn': string;
  'modifiedOn': string;
}

interface CreateStudentResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateStudentsRequest {
  'fields'?: Array<string>;
  'where.createdOn.eq'?: string;
  'where.createdOn.neq'?: string;
  'where.createdOn.gt'?: string;
  'where.createdOn.gte'?: string;
  'where.createdOn.lt'?: string;
  'where.createdOn.lte'?: string;
  'where.createdOn.like'?: string;
  'where.createdOn.in'?: string;
  'where.createdOn.nin'?: string;
  'where.createdOn.contains'?: string;
  'where.createdOn.contained'?: string;
  'where.createdOn.overlaps'?: string;
  'where.modifiedOn.eq'?: string;
  'where.modifiedOn.neq'?: string;
  'where.modifiedOn.gt'?: string;
  'where.modifiedOn.gte'?: string;
  'where.modifiedOn.lt'?: string;
  'where.modifiedOn.lte'?: string;
  'where.modifiedOn.like'?: string;
  'where.modifiedOn.in'?: string;
  'where.modifiedOn.nin'?: string;
  'where.modifiedOn.contains'?: string;
  'where.modifiedOn.contained'?: string;
  'where.modifiedOn.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.interests.eq'?: string;
  'where.interests.neq'?: string;
  'where.interests.gt'?: string;
  'where.interests.gte'?: string;
  'where.interests.lt'?: string;
  'where.interests.lte'?: string;
  'where.interests.like'?: string;
  'where.interests.in'?: string;
  'where.interests.nin'?: string;
  'where.interests.contains'?: string;
  'where.interests.contained'?: string;
  'where.interests.overlaps'?: string;
  'where.studentId.eq'?: number;
  'where.studentId.neq'?: number;
  'where.studentId.gt'?: number;
  'where.studentId.gte'?: number;
  'where.studentId.lt'?: number;
  'where.studentId.lte'?: number;
  'where.studentId.like'?: number;
  'where.studentId.in'?: string;
  'where.studentId.nin'?: string;
  'where.studentId.contains'?: string;
  'where.studentId.contained'?: string;
  'where.studentId.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'studentId'?: number;
  'interests'?: string;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateStudentsResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetStudentByIdRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface GetStudentByIdResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateStudentRequest {
  'fields'?: Array<string>;
  'id': number;
  'studentId'?: number;
  'interests'?: string;
  'createdOn': string;
  'modifiedOn': string;
}

interface UpdateStudentResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface DeleteStudentsRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface DeleteStudentsResponseOK {
  'id': number;
  'studentId': number;
  'interests': string;
  'createdOn': string;
  'modifiedOn': string;
}

interface GetUserForStudentRequest {
  'fields'?: Array<string>;
  'id': number;
}

interface GetUserForStudentResponseOK {
  'id': number;
  'firstName': string;
  'lastName': string;
  'email': string;
  'password': string;
  'mobileNo': number;
  'isEmailVerified': number;
  'isMobileVerified': number;
  'type': string;
  'status': number;
  'createdOn': string;
  'modifiedOn': string;
}

interface PostValidateOtpRequest {
  'email': string;
  'pin': string;
}

interface PostValidateOtpResponseOK {
  'statusCode': number;
  'message': string;
}

interface PostLoginRequest {
  'email': string;
  'password': string;
}

interface PostLoginResponseOK {
  'statusCode': number;
  'message': string;
  'token': string;
}

export interface Api {
  setBaseUrl(newUrl: string) : void;
  getUsers(req: GetUsersRequest): Promise<Array<GetUsersResponseOK>>;
  createUser(req: CreateUserRequest): Promise<CreateUserResponseOK>;
  updateUsers(req: UpdateUsersRequest): Promise<Array<UpdateUsersResponseOK>>;
  getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponseOK>;
  updateUser(req: UpdateUserRequest): Promise<UpdateUserResponseOK>;
  deleteUsers(req: DeleteUsersRequest): Promise<DeleteUsersResponseOK>;
  getStudentsForUser(req: GetStudentsForUserRequest): Promise<Array<GetStudentsForUserResponseOK>>;
  getCourses(req: GetCoursesRequest): Promise<Array<GetCoursesResponseOK>>;
  createCourse(req: CreateCourseRequest): Promise<CreateCourseResponseOK>;
  updateCourses(req: UpdateCoursesRequest): Promise<Array<UpdateCoursesResponseOK>>;
  getCourseById(req: GetCourseByIdRequest): Promise<GetCourseByIdResponseOK>;
  updateCourse(req: UpdateCourseRequest): Promise<UpdateCourseResponseOK>;
  deleteCourses(req: DeleteCoursesRequest): Promise<DeleteCoursesResponseOK>;
  getStudents(req: GetStudentsRequest): Promise<Array<GetStudentsResponseOK>>;
  createStudent(req: CreateStudentRequest): Promise<CreateStudentResponseOK>;
  updateStudents(req: UpdateStudentsRequest): Promise<Array<UpdateStudentsResponseOK>>;
  getStudentById(req: GetStudentByIdRequest): Promise<GetStudentByIdResponseOK>;
  updateStudent(req: UpdateStudentRequest): Promise<UpdateStudentResponseOK>;
  deleteStudents(req: DeleteStudentsRequest): Promise<DeleteStudentsResponseOK>;
  getUserForStudent(req: GetUserForStudentRequest): Promise<GetUserForStudentResponseOK>;
  postValidateOtp(req: PostValidateOtpRequest): Promise<PostValidateOtpResponseOK | undefined>;
  postLogin(req: PostLoginRequest): Promise<PostLoginResponseOK | undefined>;
}

