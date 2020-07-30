import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Charge} from '../../../data/models/charge.model';
import {ChargesService} from '../charges/charges.service';

@Component({
    selector     : 'sales-charge-form-dialog',
    templateUrl  : './charge-form.component.html',
    styleUrls    : ['./charge-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SalesChargeFormDialogComponent
{
    action: string;
    charge: Charge;
    chargeForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<SalesChargeFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _chargesService
     * @param _toastService
     */
    constructor(
        public matDialogRef: MatDialogRef<SalesChargeFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _chargesService: ChargesService,
        private _toastService: ToastrService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier Charge';
            this.charge = _data.charge;
        }
        else
        {
            this.dialogTitle = 'Ajouter Charge';
            this.charge = new Charge({});
        }
        this.chargeForm = this.createChargeForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create charge form
     *
     * @returns {FormGroup}
     */
    createChargeForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.charge.id),
            date: new FormControl(this.charge.date, Validators.required),
            price: new FormControl(this.charge.price, Validators.required),
            costOfDay: new FormControl(this.charge.costOfDay,Validators.required),
            dailyCharge: new FormControl(this.charge.dailyCharge,Validators.required)
        });
    }
    save(){
        this.charge = new Charge();
        this.charge = this.chargeForm.getRawValue();
        if (!this.charge.id) {
            this._chargesService.create(this.charge).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._chargesService.getCharges();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }else {
            this._chargesService.update(this.charge).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._chargesService.getCharges();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }
}
