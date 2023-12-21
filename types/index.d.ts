import { Course } from './Course'
import { Otp } from './Otp'
import { Student } from './Student'
import { Tutor } from './Tutor'
import { TutorRequest } from './TutorRequest'
import { User } from './User'
import { UserLogin } from './UserLogin'

interface EntityTypes {
  Course: Course
  Otp: Otp
  Student: Student
  Tutor: Tutor
  TutorRequest: TutorRequest
  User: User
  UserLogin: UserLogin
}

export { EntityTypes, Course, Otp, Student, Tutor, TutorRequest, User, UserLogin }