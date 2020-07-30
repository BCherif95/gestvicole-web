import {FuseSharedModule} from '../../@fuse/shared.module';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProdGraphComponent} from './dashboards/prod-graph/prod-graph.component';
import {SaleGraphComponent} from './dashboards/sale-graph/sale-graph.component';
import {ChartProdGraphComponent} from './dashboards/chart-prod-graph/chart-prod-graph.component';
import {ChargeBarchartComponent} from './dashboards/charge-bar-chart/charge-bar-chart.component';
import {ChargeLineChartComponent} from './dashboards/charge-line-chart/charge-line-chart.component';
import {ProdBarChartComponent} from './dashboards/prod-bar-chart/prod-bar-chart.component';
import {ProdLineChartComponent} from './dashboards/prod-line-chart/prod-line-chart.component';
import {SaleBarChartComponent} from './dashboards/sale-bar-chart/sale-bar-chart.component';
import {SaleLineChartComponent} from './dashboards/sale-line-chart/sale-line-chart.component';

const routes = [

    {
        path: 'dashboards/main',
        loadChildren: './dashboards/main/main.dashboard.module#MainDashboardModule'
    },
    {
        path: 'view-production',
        loadChildren: './view-production/view-production.module#ViewProductionModule'
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
    },
    {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule',
    },
    {
        path: 'stock-management',
        loadChildren: './stock-management/stock-management.module#StockManagementModule',
    }


];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [
        ProdGraphComponent,
        SaleGraphComponent,
        ChartProdGraphComponent,
        ChargeBarchartComponent,
        ChargeLineChartComponent,
        ProdBarChartComponent,
        ProdLineChartComponent,
        SaleBarChartComponent,
        SaleLineChartComponent
    ],
    providers: [],
    exports: [
        ProdGraphComponent,
        SaleGraphComponent,
        ChartProdGraphComponent,
        ChargeBarchartComponent,
        ChargeLineChartComponent,
        ProdBarChartComponent,
        ProdLineChartComponent,
        SaleBarChartComponent,
        SaleLineChartComponent
    ],
    entryComponents: []
})
export class ViewsModule {
}