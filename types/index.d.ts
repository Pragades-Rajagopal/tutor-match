import { Course } from './Course'
import { Otp } from './Otp'
import { User } from './User'
import { UserLogin } from './UserLogin'

interface EntityTypes {
  Course: Course
  Otp: Otp
  User: User
  UserLogin: UserLogin
}

export { EntityTypes, Course, Otp, User, UserLogin }