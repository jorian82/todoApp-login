import {State} from "./user.reducer";
import {createSelector} from "@ngrx/store";

export const selectUser = (state: State) => state.user;

export const selectToken = (state: State) => state.token;

export const getFullState = () => createSelector(
  selectUser,
  selectToken,
  (user, token) : State => {
    return {user, token};
  }
);
