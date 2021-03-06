import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {CustomersService} from './customers.service';
import {SalesCustomerFormDialogComponent} from '../customer-form/customer-form.component';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {RoleHelpers} from '../../../authz/role.helpers';

@Component({
    selector     : 'sales-customers',
    templateUrl  : './customers.component.html',
    styleUrls    : ['./customers.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CustomersComponent implements OnInit
{
    dialogRef: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['name', 'mobilePhone', 'homePhone','address','buttons'];

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
        private _customersService: CustomersService,
        private _toastService: ToastrService,
        private _matDialog: MatDialog,
        private roleHelpers: RoleHelpers
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
        this.dataSource = new FilesDataSource(this._customersService, this.paginator, this.sort);

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

    newCustomer() {
        this.dialogRef = this._matDialog.open(SalesCustomerFormDialogComponent, {
            panelClass: 'customer-form-dialog',
            data      : {
                action: 'new'
            }
        });
    }
    editCustomer(customer) {
        this.dialogRef = this._matDialog.open(SalesCustomerFormDialogComponent, {
            panelClass: 'customer-form-dialog',
            data      : {
                customer: customer,
                action: 'edit'
            }
        });
    }


    delete(customer): void {
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
    }

    has(scope: string): boolean {
        return this.roleHelpers.hasRole('customer', scope);
    }
}


export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {CustomersService} _customersService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _customersService: CustomersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._customersService.customers;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._customersService.onCustomersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._customersService.customers.slice();

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
                case 'mobilePhone':
                    [propertyA, propertyB] = [a.mobilePhone, b.mobilePhone];
                    break;
                case 'homePhone':
                    [propertyA, propertyB] = [a.homePhone, b.homePhone];
                    break;
                case 'address':
                    [propertyA, propertyB] = [a.address, b.address];
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
