import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../../../data/models/product.model';
import {ProductsService} from '../products/products.service';
import {StockEntry} from '../../../data/models/stock.entry.model';
import {StockEntriesService} from '../stock-entries/stock-entries.service';
import {RoleHelpers} from '../../../authz/role.helpers';

@Component({
    selector     : 'stock-management-stock-entry-dialog',
    templateUrl  : './stock-entry.component.html',
    styleUrls    : ['./stock-entry.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class StockEntryComponent
{
    action: string;
    stockEntry: StockEntry;
    product: Product;
    products: Product[];
    stockEntryForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<StockEntryComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _productsService
     * @param _stockEntriesService
     * @param _toastService
     */
    constructor(
        public matDialogRef: MatDialogRef<StockEntryComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _productsService: ProductsService,
        private _stockEntriesService: StockEntriesService,
        private _toastService: ToastrService,
    )
    {
        // Set the defaults
        this.action = _data.action;
        this.getProducts();

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier une entrée';
            this.stockEntry = _data.stockEntry;
            this.getProduct(this.stockEntry.product.id);
            this.stockEntryForm = this.updateStockEntryForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter une entrée';
            this.stockEntry = new StockEntry({});
            this.stockEntryForm = this.createStockEntryForm();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create stockEntry form
     *
     * @returns {FormGroup}
     */
    createStockEntryForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.stockEntry.id),
            date: new FormControl(this.stockEntry.date, Validators.required),
            product: new FormControl(this.stockEntry.product, Validators.required),
            quantityEntry: new FormControl(this.stockEntry.quantityEntry, Validators.required),
            observation: new FormControl(this.stockEntry.observation)
        });
    }

    /**
     * update stockEntry form
     *
     * @returns {FormGroup}
     */
    updateStockEntryForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.stockEntry.id),
            date: new FormControl(this.stockEntry.date, Validators.required),
            product: new FormControl(this.stockEntry.product.id, Validators.required),
            quantityEntry: new FormControl(this.stockEntry.quantityEntry, Validators.required),
            observation: new FormControl(this.stockEntry.observation)
        });
    }

    getProducts() {
        this._productsService.getAll().subscribe(value => {
            this.products = value['response'];
        },error => {console.log(error)});
    }

    getProduct(id: number) {
        this._productsService.getById(id).subscribe(value => {
            this.product = value['response'];
        },error => {console.log(error)});
    }

    saveOrUpdate(){
        this.stockEntry = new StockEntry();
        this.stockEntry = this.stockEntryForm.getRawValue();
        this.stockEntry.product = this.product;
        if (!this.stockEntry.id) {
            this._stockEntriesService.create(this.stockEntry).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._stockEntriesService.getStockEntries();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }

    findProductSelected(value) {
        this.getProduct(value);
    }
}
