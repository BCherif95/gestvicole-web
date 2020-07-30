import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {Invoice} from '../../../data/models/invoice.model';
import {InvoicesService} from '../invoices/invoices.service';
import {Router} from '@angular/router';
import {METHOD_OF_PAYMENT} from '../../../data/enums/enums';
import {Payment} from '../../../data/models/payment.model';
import {PaymentsService} from '../payments/payments.service';

@Component({
    selector     : 'sales-payment-form-dialog',
    templateUrl  : './payment-form.component.html',
    styleUrls    : ['./payment-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SalesPaymentFormDialogComponent implements OnInit, OnDestroy{
    action: string;
    payment: Payment;
    invoice: Invoice;
    invoices: Invoice[];
    paymentForm: FormGroup;
    dialogTitle: string;
    methodes: any[];
    methodOfPaymentEnum = METHOD_OF_PAYMENT;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SalesPaymentFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _invoicesService
     * @param _paymentsService
     * @param _toastService
     * @param _router
     */
    constructor(
        public matDialogRef: MatDialogRef<SalesPaymentFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _invoicesService: InvoicesService,
        private _paymentsService: PaymentsService,
        private _toastService: ToastrService,
        private _router: Router
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier un paiement';
            this.payment = _data.payment;
        }
        else if (this.action === 'paid'){
            this.dialogTitle = 'Émettre un paiement';
            this.invoice = _data.invoice;
            this.issuePaymentForm();
        }else {
            this.dialogTitle = 'Ajouter un paiement';
            this.payment = new Payment({});
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.methodes = Object.keys(this.methodOfPaymentEnum);
        this.getAllInvoices();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * issue form
     *
     * @returns {FormGroup}
     */
    issuePaymentForm(){
        this.paymentForm = this._formBuilder.group({
            id: new FormControl(''),
            invoice: new FormControl(this.invoice.id, Validators.required),
            paymentDate: new FormControl(new Date(), Validators.required),
            amount: new FormControl('', Validators.required),
            methodOfPayment: new FormControl(this.invoice.methodOfPayment, Validators.required),
            total: new FormControl(this.invoice.amount),
            reference: new FormControl('')
        });
    }

    getAllInvoices(){
        this._invoicesService.getAll().subscribe(value => {
            this.invoices = value['response'];
        }, error => console.log(error))
    }

    getInvoiceById(id: number) {
        this._invoicesService.getById(id).subscribe(value => {
            this.invoice = value['response'];
        },error => console.log(error))
    }

    findInvoiceSelected(value) {
        this.getInvoiceById(value);
    }

    save(){
        this.payment = new Payment();
        this.payment = this.paymentForm.getRawValue();
        this.payment.invoice = this.invoice;
        this._paymentsService.create(this.payment).subscribe(data => {
            if (data['status'] === 'OK') {
                this._toastService.success(data['message']);
                this._router.navigateByUrl('/views/sales/payments');
            } else {
                this._toastService.error(data['message']);
            }
            this.matDialogRef.close();
        });
    }

}
