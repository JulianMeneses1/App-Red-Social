import { createAction, props } from "@ngrx/store";
import { AuthModel } from "src/app/core/models/Auth.interface";

export const onLogin = createAction(
    '[Login Page] Login',
    props<{ credentials: object }>()
);

export const successfulLogin = createAction(
    '[Login Page] Successful login',
    props<{ login: AuthModel }>()
);

export const finishLoading = createAction(
    '[Login Page] Finish loading'
);

export const onToggleSignIn = createAction(
    '[Login Page] On toggle sign in'
)
