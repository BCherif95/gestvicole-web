import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule, MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {MatTableExporterModule} from 'mat-table-exporter';
import {AgmCoreModule} from '@agm/core';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {FuseWidgetModule} from '../../../@fuse/components';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesService} from './categories/categories.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import {ProductsComponent} from './products/products.component';
import {ProductsService} from './products/products.service';
import {ProductFormComponent} from './product-form/product-form.component';
import {StocksComponent} from './stocks/stocks.component';
import {StocksService} from './stocks/stocks.service';
import {StockEntriesComponent} from './stock-entries/stock-entries.component';
import {StockEntriesService} from './stock-entries/stock-entries.service';
import {StockOutsService} from './stock-outs/stock-outs.service';
import {StockOutsComponent} from './stock-outs/stock-outs.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { StockOutComponent } from './stock-out/stock-out.component';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';

// @ts-ignore
export const options: Partial<IConfig> | (() => Partial<IConfig>);

const routes: Routes = [
    {
        path     : 'categories',
        component: CategoriesComponent,
        resolve  : {
            data: CategoriesService
        }
    },
    {
        path     : 'products',
        component: ProductsComponent,
        resolve  : {
            data: ProductsService
        }
    },
    {
        path     : 'stocks',
        component: StocksComponent,
        resolve  : {
            data: StocksService
        }
    },
    {
        path     : 'stock-entries',
        component: StockEntriesComponent,
        resolve  : {
            data: StockEntriesService
        }
    },
    {
        path     : 'stock-outs',
        component: StockOutsComponent,
        resolve  : {
            data: StockOutsService
        }
    }
];

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryFormComponent,
        ProductsComponent,
        ProductFormComponent,
        StocksComponent,
        StockEntriesComponent,
        StockOutsComponent,
        StockEntryComponent,
        StockOutComponent
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
        MatToolbarModule,
        MatMenuModule,
        MatTooltipModule,
        MatDialogModule,
        ConfirmDialogModule
    ],
    providers: [
    ],
    entryComponents: [
        CategoryFormComponent,
        ProductFormComponent,
        StockEntryComponent,
        StockOutComponent
    ]
})
export class StockManagementModule {
    
}