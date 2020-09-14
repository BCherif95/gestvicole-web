import {NgModule} from '@angular/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule, MatToolbarModule
} from '@angular/material';
import {AgmCoreModule} from '@agm/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';
import {ViewProductionBuildingsComponent} from './buildings/buildings.component';
import {ViewProductionBuildingsService} from './buildings/buildings.service';
import {ViewProductionBuildingService} from './building/building.service';
import {ViewProductionBuildingComponent} from './building/building.component';
import {ProductionsService} from './productions/productions.service';
import {ProductionsComponent} from './productions/productions.component';
import {ProductionComponent} from './production/production.component';
import {ProductionService} from './production/production.service';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {MatTableExporterModule} from 'mat-table-exporter';
import {BuildingCreateGuard, BuildingMenuGuard, BuildingUpdateGuard, ProductionCreateGuard, ProductionMenuGuard, ProductionUpdateGuard} from '../../shared/role.guard';

const options: Partial<IConfig> = {
    validation: false
}


const routes: Routes = [
    {
        path     : 'buildings',
        component: ViewProductionBuildingsComponent,
        resolve  : {
            data: ViewProductionBuildingsService
        }
    },
    {
        path     : 'buildings/:id',
        component: ViewProductionBuildingComponent,
        resolve  : {
            data: ViewProductionBuildingService
        }
    },
    {
        path     : 'buildings/:id/:name',
        component: ViewProductionBuildingComponent,
        resolve  : {
            data: ViewProductionBuildingService
        }
    },
    {
        path     : 'productions',
        component: ProductionsComponent,
        resolve  : {
            data: ProductionsService
        }
    },
    {
        path     : 'productions/:id',
        component: ProductionComponent,
        resolve  : {
            data: ProductionService
        }
    },
    {
        path     : 'productions/:id/:name',
        component: ProductionComponent,
        resolve  : {
            data: ProductionService
        }
    }
];

@NgModule({
    declarations: [
        ViewProductionBuildingsComponent,
        ViewProductionBuildingComponent,
        ProductionsComponent,
        ProductionComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        NgxMaskModule.forRoot(options),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatTableExporterModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        NgxMaskModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatToolbarModule
    ],
    providers: [
        ViewProductionBuildingsService,
        ViewProductionBuildingService
    ],
    entryComponents: [

    ]
})
export class ViewProductionModule {
}
