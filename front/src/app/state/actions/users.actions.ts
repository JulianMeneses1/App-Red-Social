import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/core/models/User.interface";

export const onCreateUser = createAction(
    '[Register Page] On create user',
    props<{ user: UserModel }>()
);

export const createUser = createAction(
    '[Register Page] Create user',
    props<{ user: UserModel }>()
);

export const finishLoading = createAction(
    '[All Pages] Finish loading'
);
