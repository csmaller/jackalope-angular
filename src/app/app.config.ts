import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routing';
import { userReducer } from './store/user/user.reducer';
import { UsersEffects } from './store/user/user.effects';
import { blogReducer } from './store/blog/blog.reducer';
import { BlogEffects } from './store/blog/blog.effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ users: userReducer, blogs: blogReducer, auth: authReducer }),
    provideEffects([UsersEffects, BlogEffects, AuthEffects]),
  ],
};
