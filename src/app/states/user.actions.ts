import { Action, createAction, props } from '@ngrx/store';
import { Token, User } from "../models/user.model";

export const setUser = createAction('[User State] Set User', props<{user: User}>());
export const setToken = createAction('[User State] Set Token', props<{token: Token}>());
export const deleteUser = createAction('[User State] Delete User');
export const deleteToken = createAction('[User State] Delete Token');
export const resetUserState = createAction('[User State] Reset User State');
