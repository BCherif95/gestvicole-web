import {NgModule} from '@angular/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AgmCoreModule} from '@agm/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';
import {CustomersComponent} from './customers/customers.component';
import {CustomersService} from './customers/customers.service';
import {SalesCustomerFormDialogComponent} from './customer-form/customer-form.component';
import {OrdersComponent} from './orders/orders.component';
import {OrdersService} from './orders/orders.service';
import {SalesOrderFormDialogComponent} from './order-form/order-form.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {InvoicesService} from './invoices/invoices.service';
import {SalesInvoiceFormDialogComponent } from './invoice-form/invoice-form.component';
import {PaymentsComponent} from './payments/payments.component';
import {PaymentsService} from './payments/payments.service';
import {SalesPaymentFormDialogComponent} from './payment-form/payment-form.component';
import {ChargesComponent} from './charges/charges.component';
import {ChargesService} from './charges/charges.service';
import {SalesChargeFormDialogComponent} from './charge-form/charge-form.component';
import {InvoicePrintComponent} from './invoice-print/invoice-print.component';
import {InvoicePrintService} from './invoice-print/invoice-print.service';
import {ChargesInfosService} from './charges-infos/charges-infos.service';
import {ChargesInfosComponent} from './charges-infos/charges-infos.component';
import {ConfirmDialogModule} from '../confirm-dialog/confirm-dialog.module';
import {ChargeMenuGuard, CustomerMenuGuard, InvoiceMenuGuard, InvoicePrintGuard, OrderMenuGuard, PaymentMenuGuard} from '../../shared/role.guard';

const options: Partial<IConfig> = {
    validation: false
}


const routes: Routes = [
    {
        path     : 'customers',
        component: CustomersComponent,
        resolve  : {
            data: CustomersService
        }
    },
    {
        path     : 'invoices',
        component: InvoicesComponent,
        resolve  : {
            data: InvoicesService
        }
    },
    {
        path     : 'orders',
        component: OrdersComponent,
        resolve  : {
            data: OrdersService
        }
    },
    {
        path     : 'payments',
        component: PaymentsComponent,
        resolve  : {
            data: PaymentsService
        }
    },
    {
        path     : 'charges',
        component: ChargesComponent,
        resolve  : {
            data: ChargesService
        }
    },
    {
        path: 'charges/infos/:id',
        component: ChargesInfosComponent,
        resolve: {
            data: ChargesInfosService
        }
    },
    {
        path: 'print/payment/:id',
        component: InvoicePrintComponent,
        resolve: {
            data: InvoicePrintService
        }
    }

];

@NgModule({
    declarations: [
        CustomersComponent,
        OrdersComponent,
        InvoicesComponent,
        PaymentsComponent,
        ChargesComponent,
        InvoicePrintComponent,
        SalesCustomerFormDialogComponent,
        SalesOrderFormDialogComponent,
        SalesInvoiceFormDialogComponent,
        SalesPaymentFormDialogComponent,
        SalesChargeFormDialogComponent,
        ChargesInfosComponent
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
        MatToolbarModule,
        MatTooltipModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        MatDialogModule,
        MatMenuModule,
        ConfirmDialogModule
    ],
    providers: [
        CustomersService,
        OrdersService
    ],
    entryComponents: [
        SalesCustomerFormDialogComponent,
        SalesOrderFormDialogComponent,
        SalesInvoiceFormDialogComponent,
        SalesPaymentFormDialogComponent,
        SalesChargeFormDialogComponent
    ]
})
export class SalesModule {
}
