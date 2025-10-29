import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state) => ({ ...state, loading: false, isAuthenticated: true })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(AuthActions.logout, (state) => ({ ...state, loading: true })),
  on(AuthActions.logoutSuccess, (state) => ({ ...state, loading: false, isAuthenticated: false })),
  
  on(AuthActions.setAuthenticated, (state, { isAuthenticated }) => ({ ...state, isAuthenticated }))
);