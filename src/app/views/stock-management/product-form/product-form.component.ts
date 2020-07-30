import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../../data/models/category.model';
import {CategoriesService} from '../categories/categories.service';
import {Product} from '../../../data/models/product.model';
import {ProductsService} from '../products/products.service';

@Component({
    selector     : 'stock-management-product-form-dialog',
    templateUrl  : './product-form.component.html',
    styleUrls    : ['./product-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProductFormComponent
{
    action: string;
    product: Product;
    category: Category;
    categories: Category[];
    productForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ProductFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _productsService
     * @param _categoriesService
     * @param _toastService
     */
    constructor(
        public matDialogRef: MatDialogRef<ProductFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _productsService: ProductsService,
        private _categoriesService: CategoriesService,
        private _toastService: ToastrService
    )
    {
        // Set the defaults
        this.action = _data.action;
        this.getCategories();

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier un produit';
            this.product = _data.product;
            this.getCategory(this.product.category.id);
            this.productForm = this.updateProductForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter un produit';
            this.product = new Product({});
            this.productForm = this.createProductForm();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create customer form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.product.id),
            designation: new FormControl(this.product.designation, Validators.required),
            category: new FormControl(this.product.category, Validators.required),
            description: new FormControl(this.product.description),
            reference: new FormControl(this.product.reference)
        });
    }

    /**
     * Create customer form
     *
     * @returns {FormGroup}
     */
    updateProductForm(): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(this.product.id),
            designation: new FormControl(this.product.designation, Validators.required),
            category: new FormControl(this.product.category.id, Validators.required),
            description: new FormControl(this.product.description),
            reference: new FormControl(this.product.reference)
        });
    }

    getCategories() {
        this._categoriesService.getAll().subscribe(value => {
            this.categories = value['response'];
        },error => {console.log(error)});
    }

    getCategory(id: number) {
        this._categoriesService.getById(id).subscribe(value => {
            this.category = value['response'];
        },error => {console.log(error)});
    }

    saveOrUpdate(){
        this.product = new Product();
        this.product = this.productForm.getRawValue();
        this.product.category = this.category;
        if (!this.product.id) {
            this._productsService.create(this.product).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._productsService.getProducts();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        } else {
            this._productsService.update(this.product).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._productsService.getProducts();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }

    findCategorySelected(value) {
        this.getCategory(value);
    }
}
