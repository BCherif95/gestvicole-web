import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Customer} from '../../../data/models/customer.model';
import {Order} from '../../../data/models/order.model';
import {CustomersService} from '../customers/customers.service';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {OrdersService} from '../orders/orders.service';
import {Invoice} from '../../../data/models/invoice.model';
import {InvoicesService} from '../invoices/invoices.service';
import {Router} from '@angular/router';
import {METHOD_OF_PAYMENT} from '../../../data/enums/enums';

@Component({
    selector     : 'sales-invoice-form-dialog',
    templateUrl  : './invoice-form.component.html',
    styleUrls    : ['./invoice-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SalesInvoiceFormDialogComponent implements OnInit, OnDestroy{
    action: string;
    invoice: Invoice;
    customers: Customer[];
    customer: Customer;
    orders: Order[];
    order: Order;
    invoiceForm: FormGroup;
    dialogTitle: string;
    methodes: any[];
    methodOfPaymentEnum = METHOD_OF_PAYMENT;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SalesInvoiceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _ordersService
     * @param _customersService
     * @param _invoicesService
     * @param _toastService
     * @param _router
     */
    constructor(
        public matDialogRef: MatDialogRef<SalesInvoiceFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _ordersService: OrdersService,
        private _customersService: CustomersService,
        private _invoicesService: InvoicesService,
        private _toastService: ToastrService,
        private _router: Router
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier une facture';
            this.invoice = _data.invoice;
        }
        else if (this.action === 'bill'){
            this.dialogTitle = 'Créer une facture';
            this.order = _data.order;
            this.getCustomerById(this.order.customer.id);
            this.getOrderById(this.order.id);
            this.convertOrderToBillForm();
        }else {
            this.dialogTitle = 'Ajouter une facture';
            this.order = new Order({});
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.methodes = Object.keys(this.methodOfPaymentEnum);
        this.getAllOrder();
        this.getAllCustomer();
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
     * convertOrderToBill form
     *
     * @returns {FormGroup}
     */
    convertOrderToBillForm(){
        this.invoiceForm = this._formBuilder.group({
            id: new FormControl(this.order.id),
            customer: new FormControl(this.order.customer.id, Validators.required),
            order: new FormControl(this.order.id, Validators.required),
            invoiceDate: new FormControl(new Date(), Validators.required),
            methodOfPayment: new FormControl('', Validators.required),
            quantity: new FormControl(this.order.quantity,Validators.required),
            unitPrice: new FormControl(this.order.unitPrice,Validators.required),
            amount: new FormControl(this.order.amount,Validators.required)
            // reference: new FormControl('')
        });
    }

    getAllOrder(){
        this._ordersService.getAll().subscribe(value => {
            this.orders = value['response'];
        }, error => console.log(error))
    }

    getOrderById(id: number) {
        this._ordersService.getById(id).subscribe(value => {
            this.order = value['response'];
        },error => console.log(error))
    }

    getAllCustomer(){
        this._customersService.getAll().subscribe(value => {
            this.customers = value['response'];
        }, error => console.log(error))
    }

    getCustomerById(id: number) {
        this._customersService.getById(id).subscribe(value => {
            this.customer = value['response'];
        },error => console.log(error))
    }

    findCustomerSelected(value) {
        this.getCustomerById(value);
    }

    findOrderSelected(value) {
        this.getOrderById(value);
    }

    save(){
        this.invoice = new Invoice();
        this.invoice = this.invoiceForm.getRawValue();
        this.invoice.order = this.order;
        this.invoice.customer = this.order.customer;
        this._invoicesService.create(this.invoice).subscribe(data => {
            if (data['status'] === 'OK') {
                this._toastService.success(data['message']);
                this._router.navigateByUrl('/views/sales/invoices');
            } else {
                this._toastService.error(data['message']);
            }
            this.matDialogRef.close();
        });
    }

}
