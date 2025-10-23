import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'blog', loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent) },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];
