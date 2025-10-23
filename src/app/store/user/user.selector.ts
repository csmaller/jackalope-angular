import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state) => state.users
);
export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);
