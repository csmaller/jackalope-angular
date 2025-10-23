import { createAction, props } from '@ngrx/store';
import { User } from '@/app/models/user.model';

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const loadUser = createAction(
  '[Users] Load User',
  props<{ userId: number }>()
);
export const loadUserSuccess = createAction(
  '[Users] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[Users] Load User Failure',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[Users] Create User',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ user: User }>()
);
export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: number }>()
);
export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ userId: number }>()
);
export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const loadUsersByFirstName = createAction(
  '[Users] Load Users By First Name',
  props<{ name: string }>()
);
export const loadUsersByFirstNameSuccess = createAction(
  '[Users] Load Users By First Name Success',
  props<{ users: User[] }>()
);
export const loadUsersByFirstNameFailure = createAction(
  '[Users] Load Users By First Name Failure',
  props<{ error: string }>()
);
