import { createReducer, on } from "@ngrx/store"
import { createUser, finishLoading, onCreateUser } from "../actions/users.actions"
import { UserState } from "src/app/core/models/User.state.interface"

const initialUsers = JSON.parse(sessionStorage.getItem('users')!) || [];

export const initialState: UserState = { isLoading: false, users : initialUsers } 

export const usersReducer = createReducer(
    initialState,
    on(onCreateUser, ((state) => ({...state, isLoading: false}))),
    on(createUser, ((state, {user}) => {
        const usersUpdated = [...state.users, user];
        sessionStorage.setItem('users', JSON.stringify(usersUpdated));
        return {...state, isLoading : true, users: usersUpdated}
    })),   
    on(finishLoading, ((state) => {
        return {...state,
                isLoading: false
               }
    }))   
)