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
import {ViewsModule} from '../../views.module';

const routes: Routes = [
    {
        path     : '**',
        component: MainDashboardComponent,
        resolve  : {
            data: MainDashboardService
        }
    }
];

@NgModule({
    declarations: [
        MainDashboardComponent
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
        ViewsModule,
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

