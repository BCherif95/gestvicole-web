import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import {MainDashboardComponent} from './main.dashboard.component';
import {MainDashboardService} from './main.dashboard.service';
import {ProdGraphComponent} from '../prod-graph/prod-graph.component';
import {SaleGraphComponent} from '../sale-graph/sale-graph.component';
import {ChartProdGraphComponent} from '../chart-prod-graph/chart-prod-graph.component';
import {ChargeBarchartComponent} from '../charge-bar-chart/charge-bar-chart.component';
import {ChargeLineChartComponent} from '../charge-line-chart/charge-line-chart.component';
import {ProdBarChartComponent} from '../prod-bar-chart/prod-bar-chart.component';
import {ProdLineChartComponent} from '../prod-line-chart/prod-line-chart.component';
import {SaleBarChartComponent} from '../sale-bar-chart/sale-bar-chart.component';
import {SaleLineChartComponent} from '../sale-line-chart/sale-line-chart.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainDashboardComponent,
        resolve  : {
            data: MainDashboardService
        }
    }
];

@NgModule({
    declarations: [
        MainDashboardComponent,
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
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        MatDatepickerModule,
        MatInputModule
    ],
    providers   : [
        MainDashboardService
    ]
})
export class MainDashboardModule
{
}

