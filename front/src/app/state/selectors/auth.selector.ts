import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "src/app/core/models/Auth.state.interface";

export const selectAuthFeatures = (state: AppState) => state.auth;

export const selectIsLoading = createSelector(
    selectAuthFeatures,
    (state: AuthState) => state.isLoading
);

export const selectUser = createSelector(
    selectAuthFeatures,
    (state: AuthState) => state.login.user
);

export const selectIsAuth = createSelector(
    selectAuthFeatures,
    (state: AuthState) => state.login.isAuth
);

export const selectIsSignIn = createSelector(
    selectAuthFeatures,
    (state: AuthState) => state.isSignIn
);