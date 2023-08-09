import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "src/app/core/models/User.state.interface";

export const selectUsersFeatures = (state: AppState) => state.users;

export const selectIsLoading = createSelector(
    selectUsersFeatures,
    (state: UserState) => state.isLoading
);

export const selectUsers = createSelector(
    selectUsersFeatures,
    (state: UserState) => state.users
);