import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Customer} from '../../../data/models/customer.model';
import {CustomersService} from '../customers/customers.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector     : 'sales-customer-form-dialog',
    templateUrl  : './customer-form.component.html',
    styleUrls    : ['./customer-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SalesCustomerFormDialogComponent
{
    action: string;
    customer: Customer;
    customerForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SalesCustomerFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _customersService
     * @param _toastService
     */
    constructor(
        public matDialogRef: MatDialogRef<SalesCustomerFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _customersService: CustomersService,
        private _toastService: ToastrService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Client';
            this.customer = _data.customer;
        }
        else
        {
            this.dialogTitle = 'Ajouter Client';
            this.customer = new Customer({});
        }
        this.customerForm = this.createCustomerForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create customer form
     *
     * @returns {FormGroup}
     */
    createCustomerForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.customer.id),
            name: new FormControl(this.customer.name, Validators.required),
            mobilePhone: new FormControl(this.customer.mobilePhone, Validators.required),
            homePhone: new FormControl(this.customer.homePhone),
            address: new FormControl(this.customer.address)
        });
    }
    saveOrUpdate(){
        this.customer = new Customer();
        this.customer = this.customerForm.getRawValue();
        if (!this.customer.id) {
            this._customersService.create(this.customer).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._customersService.geCustomers();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        } else {
            this._customersService.update(this.customer).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._customersService.geCustomers();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }
}
