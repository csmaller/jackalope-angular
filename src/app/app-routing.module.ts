import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [
      () => import('./guards/auth.guard').then((m) => m.authGuard()),
    ],
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

  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
