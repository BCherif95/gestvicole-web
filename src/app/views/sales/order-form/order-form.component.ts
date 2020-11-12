import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Customer} from '../../../data/models/customer.model';
import {Order} from '../../../data/models/order.model';
import {Production} from '../../../data/models/production.model';
import {CustomersService} from '../customers/customers.service';
import {ToastrService} from 'ngx-toastr';
import {OrdersService} from '../orders/orders.service';
import {SalesCustomerFormDialogComponent} from '../customer-form/customer-form.component';
import {SearchBody} from '../../../utils/search-body';

@Component({
    selector     : 'sales-order-form-dialog',
    templateUrl  : './order-form.component.html',
    styleUrls    : ['./order-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SalesOrderFormDialogComponent {
    action: string;
    order: Order;
    customers: Customer[];
    customer: Customer;
    productions: Production[];
    production: Production;
    orderForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;
    qteAvailable;
    displayQteField= false;
    searchBody = new SearchBody();


    /**
     * Constructor
     *
     * @param {MatDialogRef<SalesOrderFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _ordersService
     * @param _customersService
     * @param _toastService
     * @param _matDialog
     */
    constructor(
        public matDialogRef: MatDialogRef<SalesOrderFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
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
            this.updateOrderForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter Commande';
            this.order = new Order({});
            this.createOrderForm();
        }
        this.getAllCustomer();
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
            orderDate: new FormControl('', Validators.required),
            quantity: new FormControl(0,Validators.required),
            unitPrice: new FormControl(0,Validators.required),
            amount: new FormControl(0,Validators.required),
            // reference: new FormControl(''),
            qteAvailable: new FormControl(this.qteAvailable),
        });
        this.updateQuantities();
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
            // production: new FormControl(this.order.production.id, Validators.required),
            orderDate: new FormControl('', Validators.required),
            quantity: new FormControl(this.order.quantity,Validators.required),
            unitPrice: new FormControl(this.order.unitPrice,Validators.required),
            amount: new FormControl(this.order.amount,Validators.required),
            // reference: new FormControl(this.order.reference),
            number: new FormControl(this.order.number),
            state: new FormControl(this.order.state),
            qteAvailable: new FormControl(this.qteAvailable),
        });
        this.updateQuantities();
    }


    getQteAvailable(searchBody: SearchBody){
        this._ordersService.getQuantityAvailable(searchBody).subscribe(value => {
            this.qteAvailable = value;
            console.log(this.qteAvailable);
        },error => console.log(error));
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

    addEvent(event) {
        this.searchBody.date = new Date(event.value);
        this.getQteAvailable(this.searchBody);
    }

    calculAmount(value) {
        let pu = Number.parseInt(value.replace(/ /g, ''));
        let quantity = this.orderForm.get('quantity').value;
        this.orderForm.get('amount').setValue(pu*quantity);
    }

    checkQte(value) {
        this.displayQteField = true;
        if (value) {
            let qte = Number.parseInt(value.replace(/ /g, ''));
            if (qte < this.qteAvailable) {
                this.orderForm.get('quantity').setValue(qte);
            } else {
                this.orderForm.get('quantity').setValue(this.qteAvailable);
                this._toastService.warning('La commande ne peut pas depasser le reste');
            }
        } else {
            this.orderForm.get('quantity').setValue(0);
        }
        this.updateQuantities();
    }

    updateQuantities() {
        let qte = this.orderForm.get('quantity').value;
        let qteAvailable = this.qteAvailable - qte;
        this.orderForm.get('qteAvailable').setValue(qteAvailable);
    }

    saveOrUpdate(){
        if (this.orderForm.get('quantity').value <= 0) {
            this._toastService.error('Le quantité à commander est toujours superieur à 0');
            return;
        }
        this.order = new Order();
        this.order = this.orderForm.getRawValue();
        this.order.customer = this.customer;
        this.order.production = this.production;
        if (!this.order.id) {
            this._ordersService.toOrder(this.order).subscribe(data => {
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
