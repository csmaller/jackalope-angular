import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogsComponent),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail.component').then((m) => m.BlogDetailComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [() => import('./guards/auth.guard').then((m) => m.authGuard)],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./admin/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./admin/blog/blog.component').then((m) => m.BlogComponent),
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
];
