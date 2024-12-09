import { createReducer, on } from "@ngrx/store";
import { User, Token } from "../models/user.model";
import * as userStateActions from "./user.actions"

const resetToken = (): Token => {
  return {id:0, username:'', email:'', roles: [], accessToken:'', refreshToken:''};
}

export interface State {
  user: User
  token: Token
}

export const initialUserState: State = {
  user: new User(),
  token: resetToken()
}

export const userStateReducer = createReducer(
  initialUserState,
  on(userStateActions.setUser, (state, {user}) => ({...state, user: user, token: state.token})),
  on(userStateActions.deleteUser, state => ({...state, user: new User(), token: state.token})),
  on(userStateActions.setToken, (state, {token}) => ({...state, token:token, user: state.user})),
  on(userStateActions.deleteToken, state => ({...state, token: resetToken(), user: state.user})),
  on(userStateActions.resetUserState, (state) => ({user: new User(), token: resetToken()}))
);

export const userStateFeatureKey = 'userState';
