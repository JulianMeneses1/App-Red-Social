export interface UserModel {
   _id?: string,
   name: string,
   lastname: string,
   username: string,
   email: string,
   password: string,
   role?: string,
   image?: string,
   created_at?: Date,
   publications?: object [],
   followers?: object [],
   followed?: object []
}