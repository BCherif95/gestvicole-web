import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {ProjectUtils} from '../../../utils/project-utils';
import {Invoice} from '../../../data/models/invoice.model';
import {InvoicePrintService} from './invoice-print.service';
import {Payment} from '../../../data/models/payment.model';

@Component({
    selector: 'sales-invoice-print',
    templateUrl: './invoice-print.component.html',
    styleUrls: ['./invoice-print.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InvoicePrintComponent implements OnInit, OnDestroy {

    projectUtils = new ProjectUtils();
    invoice: Invoice;
    payment: Payment;
    societyInfo = {
        name: 'DSN MALI',
        address: 'Hamdallaye ACI 2000',
        phone: '+223 20 29 02 17',
        email: 'contact@dsnmali.com',
        website: 'www.dsnmali.com',
        logoUri: 'assets/images/logos/dsn-logo.png',
        devisFooterText: 'N° Compte Orabank : 051639200201 --  NIF : 086138237C --RC : MA.BKO.2015 B.7466'
    };


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _invoicePrintService: InvoicePrintService
    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update order on changes
        this._invoicePrintService.onInvoiceChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(invoice => {
                this.invoice = new Invoice(invoice);
            });

        // Subscribe to update order on changes
        this._invoicePrintService.onPaymentChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(payment => {
                this.payment = payment;

            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onPrint() {
        document.title='FACTURE '+this.invoice.number;
        window.print();
    }

}
