import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Customer} from '../../../data/models/customer.model';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../../data/models/category.model';
import {CategoriesService} from '../categories/categories.service';

@Component({
    selector     : 'stock-management-category-form-dialog',
    templateUrl  : './category-form.component.html',
    styleUrls    : ['./category-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CategoryFormComponent
{
    action: string;
    category: Category;
    categoryForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CategoryFormComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param _categoriesService
     * @param _toastService
     */
    constructor(
        public matDialogRef: MatDialogRef<CategoryFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _categoriesService: CategoriesService,
        private _toastService: ToastrService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier une catégorie';
            this.category = _data.category;
        }
        else
        {
            this.dialogTitle = 'Ajouter une catégorie';
            this.category = new Category({});
        }
        this.categoryForm = this.createCustomerForm();
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
            id: new FormControl(this.category.id),
            name: new FormControl(this.category.name, Validators.required),
            description: new FormControl(this.category.description)
        });
    }
    saveOrUpdate(){
        this.category = new Customer();
        this.category = this.categoryForm.getRawValue();
        if (!this.category.id) {
            this._categoriesService.create(this.category).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._categoriesService.getCategories();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        } else {
            this._categoriesService.update(this.category).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._categoriesService.getCategories();
                } else {
                    this._toastService.error(data['message']);
                }
                this.matDialogRef.close();
            });
        }
    }
}
