import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Customer} from '../../../data/models/customer.model';
import {Order} from '../../../data/models/order.model';
import {Production} from '../../../data/models/production.model';
import {ProductionsService} from '../../view-production/productions/productions.service';
import {CustomersService} from '../customers/customers.service';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {OrdersService} from '../orders/orders.service';
import {SalesCustomerFormDialogComponent} from '../customer-form/customer-form.component';

@Component({
    selector     : 'sales-order-form-dialog',
    templateUrl  : './order-form.component.html',
    styleUrls    : ['./order-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SalesOrderFormDialogComponent implements OnInit, OnDestroy{
    action: string;
    order: Order;
    customers: Customer[];
    customer: Customer;
    productions: Production[];
    production: Production;
    orderForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SalesOrderFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _productionsService
     * @param _ordersService
     * @param _customersService
     * @param _toastService
     * @param _matDialog
     */
    constructor(
        public matDialogRef: MatDialogRef<SalesOrderFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _productionsService: ProductionsService,
        private _ordersService: OrdersService,
        private _customersService: CustomersService,
        private _toastService: ToastrService,
        private _matDialog: MatDialog
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Commande';
            this.order = _data.order;
            this.getCustomerById(this.order.customer.id);
            this.getProdById(this.order.production.id);
            this.updateOrderForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter Commande';
            this.order = new Order({});
            this.createOrderForm();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.getAllProd();
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
     * Create order form
     *
     * @returns {FormGroup}
     */
    createOrderForm(){
        this.orderForm = this._formBuilder.group({
            id: new FormControl(''),
            customer: new FormControl('', Validators.required),
            production: new FormControl('', Validators.required),
            orderDate: new FormControl(new Date(), Validators.required),
            quantity: new FormControl('',Validators.required),
            unitPrice: new FormControl('',Validators.required),
            amount: new FormControl('',Validators.required),
            reference: new FormControl(''),
            total: new FormControl(this.order.production ? this.order.production.commercialProductions : 0),
        });
    }

    /**
     * update order form
     *
     * @returns {FormGroup}
     */
    updateOrderForm(){
        this.orderForm = this._formBuilder.group({
            id: new FormControl(this.order.id),
            customer: new FormControl(this.order.customer.id, Validators.required),
            production: new FormControl(this.order.production.id, Validators.required),
            orderDate: new FormControl(new Date(this.order.orderDate), Validators.required),
            quantity: new FormControl(this.order.quantity,Validators.required),
            unitPrice: new FormControl(this.order.unitPrice,Validators.required),
            amount: new FormControl(this.order.amount,Validators.required),
            reference: new FormControl(this.order.reference),
            number: new FormControl(this.order.number),
            state: new FormControl(this.order.state),
            total: new FormControl(this.order.production ? this.order.production.commercialProductions : 0),
        });
    }

    getAllProd(){
        this._productionsService.getAll().subscribe(value => {
            this.productions = value['response'];
        }, error => console.log(error))
    }

    getProdById(id: number) {
        this._productionsService.getById(id).subscribe(value => {
            this.production = value['response'];
            this.orderForm.get('total').setValue(this.production.commercialProductions);
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

    findProdSelected(value) {
        this.getProdById(value);
    }

    calculAmount(value) {
        let pu = Number.parseInt(value.replace(/ /g, ''));
        let quantity = this.orderForm.get('quantity').value;
        let qte = Number.parseInt(quantity.replace(/ /g, ''));
        this.orderForm.get('amount').setValue(pu*qte);
    }

    saveOrUpdate(){
        this.order = new Order();
        this.order = this.orderForm.getRawValue();
        this.order.customer = this.customer;
        this.order.production = this.production;
        if (!this.order.id) {
            this._ordersService.create(this.order).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._ordersService.getOrders();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        } else {
            this._ordersService.update(this.order).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._ordersService.getOrders();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }

    newCustomer() {
        this.dialogRef = this._matDialog.open(SalesCustomerFormDialogComponent, {
            panelClass: 'customer-form-dialog',
            data      : {
                action: 'new'
            }
        });
        this.matDialogRef.close();
    }
}
