import { AuthModel } from "./Auth.interface";

export interface AuthState {
    isLoading:boolean,
    isSignIn: boolean,
    login: AuthModel
}