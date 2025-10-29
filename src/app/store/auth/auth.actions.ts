import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ credentials: { email: string; password: string } }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const checkAuth = createAction('[Auth] Check Auth');
export const setAuthenticated = createAction('[Auth] Set Authenticated', props<{ isAuthenticated: boolean }>());