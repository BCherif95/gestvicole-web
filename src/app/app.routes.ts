import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './shared/auth.guard';

const routes: Routes = [

    {
        path: '', redirectTo: 'views/dashboards/main', pathMatch: 'full'
    },

    {
        path: 'auth/login',
        loadChildren: './views/auth/login/login.module#LoginModule'
    },
    {
        path: 'errors/access-error',
        loadChildren: './views/errors/access/access.module#AccessErrorModule'
    },

    {
        path: 'views',
        loadChildren: './views/views.module#ViewsModule',
        canActivate: [AuthGuard]
    },

    {
        path: 'apps-old',
        loadChildren: './main/apps/apps.module#AppsModule',
    },

    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },

    {
        path: 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },

    {
        path: 'documentation',
        loadChildren: './main/documentation/documentation.module#DocumentationModule'
    },

    {
        path: 'angular-material-elements',
        loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    },

    {
        path: '**',
        redirectTo: 'errors/access-error'
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
