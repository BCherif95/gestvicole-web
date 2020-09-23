import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './shared/auth.guard';
import {LoginGuard} from './shared/login.guard';

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: './views/auth/login/login.module#LoginModule',
        canActivate: [LoginGuard]
    },
    {
        path: 'errors/access-error',
        loadChildren: './views/errors/access/access.module#AccessErrorModule'
    },
    {
        path: 'tr',
        loadChildren: './views/views.module#ViewsModule',
        canActivate: [AuthGuard]
    },
];
export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
