import {FuseSharedModule} from '../../@fuse/shared.module';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../shared/auth.guard';

const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboards/main/main.dashboard.module#MainDashboardModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'production',
        loadChildren: './view-production/view-production.module#ViewProductionModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'stock-management',
        loadChildren: './stock-management/stock-management.module#StockManagementModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [],
    providers: [],
    exports: [],
    entryComponents: []
})
export class ViewsModule {
}