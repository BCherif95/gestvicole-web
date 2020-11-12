import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../../../data/models/product.model';
import {ProductsService} from '../products/products.service';
import {StockOut} from '../../../data/models/stock.out.model';
import {StockOutsService} from '../stock-outs/stock-outs.service';
import {User} from '../../../data/models/user.model';
import {UsersService} from '../../admin/users/users.service';

@Component({
    selector     : 'stock-management-stock-out-dialog',
    templateUrl  : './stock-out.component.html',
    styleUrls    : ['./stock-out.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class StockOutComponent
{
    action: string;
    stockOut: StockOut;
    product: Product;
    products: Product[];
    users: User[];
    user: User;
    stockOutForm: FormGroup;
    dialogTitle: string;
    qteInTonne: number = 0;

    /**
     * Constructor
     *
     * @param {MatDialogRef<StockOutComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _productsService
     * @param _stockOutsService
     * @param _usersService
     * @param _toastService
     */
    constructor(
        public matDialogRef: MatDialogRef<StockOutComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _productsService: ProductsService,
        private _stockOutsService: StockOutsService,
        private _usersService: UsersService,
        private _toastService: ToastrService
    )
    {
        // Set the defaults
        this.action = _data.action;
        this.getProducts();
        this.getUsers();

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier une sortie';
            this.stockOut = _data.stockOut;
            this.getProduct(this.stockOut.product.id);
            this.getUser(this.stockOut.user.id);
            this.stockOutForm = this.updateStockOutForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter une sortie';
            this.stockOut = new StockOut({});
            this.stockOutForm = this.createStockOutForm();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create stockOut form
     *
     * @returns {FormGroup}
     */
    createStockOutForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.stockOut.id),
            date: new FormControl(this.stockOut.date, Validators.required),
            product: new FormControl(this.stockOut.product, Validators.required),
            quantityOut: new FormControl(this.stockOut.quantityOut, Validators.required),
            user: new FormControl(this.stockOut.user,Validators.required),
            qteInTonne: new FormControl(this.qteInTonne)
        });
    }

    /**
     * update stockEntry form
     *
     * @returns {FormGroup}
     */
    updateStockOutForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.stockOut.id),
            date: new FormControl(this.stockOut.date, Validators.required),
            product: new FormControl(this.stockOut.product.id, Validators.required),
            quantityOut: new FormControl(this.stockOut.quantityOut, Validators.required),
            user: new FormControl(this.stockOut.user.id,Validators.required),
            qteInTonne: new FormControl(this.qteInTonne)
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

    getUsers() {
        this._usersService.getAll().subscribe(value => {
            this.users = value['response'];
        },error => {console.log(error)});
    }

    getUser(id: number) {
        this._usersService.getById(id).subscribe(value => {
            this.user = value['response'];
        },error => {console.log(error)});
    }

    findProductSelected(value) {
        this.getProduct(value);
    }

    findUserSelected(value) {
        this.getUser(value);
    }

    convertKgToTon(value: any) {
        let qte = Number.parseInt(value.replace(/ /g, ''));
        this.qteInTonne = 0.001*qte;
        this.stockOutForm.get('qteInTonne').setValue(this.qteInTonne);
    }

    saveOrUpdate(){
        this.stockOut = new StockOut();
        this.stockOut = this.stockOutForm.getRawValue();
        this.stockOut.product = this.product;
        this.stockOut.user = this.user;
        if (!this.stockOut.id) {
            this._stockOutsService.create(this.stockOut).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._stockOutsService.getStockOuts();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }

}
