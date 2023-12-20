import { Course } from './Course'
import { Otp } from './Otp'
import { Student } from './Student'
import { User } from './User'
import { UserLogin } from './UserLogin'
  
interface EntityTypes  {
  Course: Course
    Otp: Otp
    Student: Student
    User: User
    UserLogin: UserLogin
}
  
export { EntityTypes, Course, Otp, Student, User, UserLogin }