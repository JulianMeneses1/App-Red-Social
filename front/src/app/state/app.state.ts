import { ActionReducerMap } from "@ngrx/store";
import { UserState } from "../core/models/User.state.interface";
import { authReducer } from "./reducers/auth.reducer";
import { AuthState } from "../core/models/Auth.state.interface";

export interface AppState {
    // users: UserState,
    auth: AuthState
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    auth: authReducer
  }