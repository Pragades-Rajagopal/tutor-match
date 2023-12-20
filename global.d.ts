/// <reference types="@platformatic/db" />
import { EntityHooks } from '@platformatic/sql-mapper'
import { EntityTypes, Course,Otp,Student,User,UserLogin } from './types'

declare module 'fastify' {
  interface FastifyInstance {
    getSchema<T extends 'Course' | 'Otp' | 'Student' | 'User' | 'UserLogin'>(schemaId: T): {
      '$id': string,
      title: string,
      description: string,
      type: string,
      properties: {
        [x in keyof EntityTypes[T]]: { type: string, nullable?: boolean }
      },
      required: string[]
    };
  }
}

declare module '@platformatic/sql-mapper' {
  interface Entities {
    course: Entity<Course>,
    otp: Entity<Otp>,
    student: Entity<Student>,
    user: Entity<User>,
    userLogin: Entity<UserLogin>,
  }
}

declare module '@platformatic/types' {
  interface PlatformaticApp {
    addEntityHooks(entityName: 'course', hooks: EntityHooks<Course>): any
    addEntityHooks(entityName: 'otp', hooks: EntityHooks<Otp>): any
    addEntityHooks(entityName: 'student', hooks: EntityHooks<Student>): any
    addEntityHooks(entityName: 'user', hooks: EntityHooks<User>): any
    addEntityHooks(entityName: 'userLogin', hooks: EntityHooks<UserLogin>): any
  }
}
