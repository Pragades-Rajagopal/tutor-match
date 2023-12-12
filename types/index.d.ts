import { Otp } from './Otp'
import { User } from './User'
import { UserLogin } from './UserLogin'

interface EntityTypes {
  Otp: Otp
  User: User
  UserLogin: UserLogin
}

export { EntityTypes, Otp, User, UserLogin }