import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {CategoriesService} from './categories.service';
import {CategoryFormComponent} from '../category-form/category-form.component';

@Component({
    selector     : 'stock-management-categories',
    templateUrl  : './categories.component.html',
    styleUrls    : ['./categories.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit
{
    dialogRef: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'description','buttons'];

    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _categoriesService: CategoriesService,
        private _toastService: ToastrService,
        private _matDialog: MatDialog
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._categoriesService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    newCategory() {
        this.dialogRef = this._matDialog.open(CategoryFormComponent, {
            panelClass: 'category-form-dialog',
            data      : {
                action: 'new'
            }
        });
    }
    editCategory(category) {
        this.dialogRef = this._matDialog.open(CategoryFormComponent, {
            panelClass: 'category-form-dialog',
            data      : {
                category: category,
                action: 'edit'
            }
        });
    }


    /*delete(customer): void {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes-vous sûre de vouloir supprimé ?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._customersService.delete(customer.id).subscribe(ret => {
                    if (ret['status'] == 'OK') {
                        this._toastService.success(ret['message']);
                        const customerIndex = this._customersService.customers.indexOf(customer);
                        this._customersService.customers.splice(customerIndex, 1);
                        this._customersService.onCustomersChanged.next(this._customersService.customers);

                    } else {
                        this._toastService.error(ret['message']);
                    }
                });
            }
            this.confirmDialogRef = null;
        });
    }*/

}


export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     * @param _categoriesService
     * @param _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _categoriesService: CategoriesService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._categoriesService.categories;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._categoriesService.onCategoriesChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._categoriesService.categories.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'description':
                    [propertyA, propertyB] = [a.description, b.description];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
