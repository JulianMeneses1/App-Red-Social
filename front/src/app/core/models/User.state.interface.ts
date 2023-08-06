import { UserModel } from "./User.interface";

export interface UserState {
    isLoading:boolean,
    users: UserModel []
}