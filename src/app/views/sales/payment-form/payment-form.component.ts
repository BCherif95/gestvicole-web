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
import {ProjectUtils} from '../../../utils/project-utils';

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

    projectUtils = new ProjectUtils();
    currentUser = this.projectUtils.getAppUser();

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
        this.payment = new Payment();

        if (this.action === 'issue'){
            this.payment.invoice = _data.invoice;
            this.getInvoiceById(this.payment.invoice.id);
            this.dialogTitle = 'Emission de paiement sur la facture Nº' + this.payment.invoice.number;
            this.issuePaymentForm();
        }else if (this.action === 'validate') {
            this.payment = _data.payment;
            this.dialogTitle = 'Validation de paiement de la Facture Nº ' + this.payment.number;

            this.validatePaymentForm();

        } else {
            this.dialogTitle = 'Nouveau Paiment';
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
            invoice: new FormControl(this.payment.invoice.id, Validators.required),
            paymentDate: new FormControl(new Date(), Validators.required),
            netToPay: new FormControl('', Validators.required),
            amount: new FormControl(''),
            methodOfPayment: new FormControl(this.payment.invoice.methodOfPayment, Validators.required),
            stayToPay: new FormControl(this.payment.invoice ? this.payment.invoice.stayToPay : 0),
            total: new FormControl(this.payment.invoice ? this.payment.invoice.amount : 0)
        });
        this.updateAmounts();
    }

    validatePaymentForm() {
        let netToPay = this.payment.netToPay;
        let amount = netToPay;
        let stayToPay = this.payment.invoice ? (this.payment.invoice.amount - amount) : 0;
        this.paymentForm = this._formBuilder.group({
            id: new FormControl(this.payment.id),
            reference: new FormControl(this.payment.reference),
            methodOfPayment: new FormControl(this.payment.methodOfPayment, Validators.required),
            paymentDate: new FormControl(new Date(this.payment.paymentDate), Validators.required),
            invoice: new FormControl(this.payment.invoice, Validators.required),
            netToPay: new FormControl(netToPay, Validators.required),
            amount: new FormControl(amount, Validators.required),
            stayToPay: new FormControl(stayToPay),
            total: new FormControl(this.payment.invoice ? this.payment.invoice.amount : 0)
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

    save() {
        if (this.paymentForm.get('netToPay').value <= 0) {
            this._toastService.error('Le net à payer est toujours superieur à 0');
            this.matDialogRef.close();
        }
        this.payment = this.paymentForm.getRawValue();
        if (this.action === 'issue') {
            this.payment.amount = this.payment.netToPay;
            this.payment.invoice = this.invoice;
            this.payment.createBy = this.projectUtils.getAppUser();
            this._paymentsService.create(this.payment).subscribe(ret => {
                if (ret['status'] === 'OK') {
                    let invoicePayment = ret['response'];
                    this._toastService.success(ret['message']);
                    // this._router.navigateByUrl('/views/sales/payments');
                    this._router.navigateByUrl('/tr/sales/print/payment/'+invoicePayment.id);
                    if (this._paymentsService.payments) {
                        this._paymentsService.payments.push(ret['response']);
                        this._paymentsService.onPaymentsChanged.next(this._paymentsService.payments);
                    }
                    this.matDialogRef.close();
                } else {
                    this._toastService.error(ret['message']);
                }
            }, error => {
            });
        } else if (this.action === 'validate') {
            this.payment.validateBy = this.currentUser;
            console.log(this.currentUser);
            this._paymentsService.validate(this.payment).subscribe(ret => {
                if (ret['status'] === 'OK') {
                    this._toastService.success(ret['message']);
                    this._paymentsService.getPayments();

                    this.matDialogRef.close();
                } else {
                    this._toastService.error(ret['message']);
                }
            }, error => {
            });
        }
    }

    checkNetToPay(value) {
        if (value) {
            let netToPay = Number.parseInt(value.replace(/ /g, ''));
            if (netToPay < this.payment.invoice.stayToPay) {
                this.paymentForm.get('netToPay').setValue(netToPay);
            } else {
                this.paymentForm.get('netToPay').setValue(this.payment.invoice.stayToPay);
                this._toastService.warning('Le montant ne peut pas depasser le reste à payer');
            }
        } else {
            this.paymentForm.get('netToPay').setValue(0);
        }
        this.updateAmounts();
    }

    updateAmounts() {
        let netToPay = this.paymentForm.get('netToPay').value;
        let newStayToPay = this.payment.invoice.stayToPay - netToPay;
        this.paymentForm.get('stayToPay').setValue(newStayToPay);
    }

}
