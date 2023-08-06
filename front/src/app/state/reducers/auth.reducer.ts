import { createReducer, on } from "@ngrx/store"
import { AuthState } from "src/app/core/models/Auth.state.interface"
import { finishLoading, onLogin, onToggleSignIn, successfulLogin } from "../actions/auth.actions"

export const initialLogin = JSON.parse(sessionStorage.getItem('login')!) || {
    isAuth : false,
    user: undefined
}

export const initialState: AuthState = { 
    isLoading: false, 
    isSignIn: true,
    login : initialLogin
} 

export const authReducer = createReducer(
    initialState,
    on(onLogin, (state) => ({...state, isLoading : true})),
    on(successfulLogin, (state, {login} ) => ({...state, isLoading : false, login })),
    on(finishLoading, (state)=> ({...state, isLoading: false})),
    on(onToggleSignIn, (state)=> ({...state, isSignIn : !state.isSignIn}))
)