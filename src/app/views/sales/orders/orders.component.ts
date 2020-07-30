import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {OrdersService} from './orders.service';
import { ORDER_STATE } from 'app/data/enums/enums';
import {SalesOrderFormDialogComponent} from '../order-form/order-form.component';
import {SalesInvoiceFormDialogComponent} from '../invoice-form/invoice-form.component';

@Component({
    selector     : 'sales-orders',
    templateUrl  : './orders.component.html',
    styleUrls    : ['./orders.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit
{
    dialogRef: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['number','customer','orderDate','quantity','unitPrice','amount','state','buttons'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    orderstate = ORDER_STATE;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ordersService: OrdersService,
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
        this.dataSource = new FilesDataSource(this._ordersService, this.paginator, this.sort);

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

    newOrder() {
        this.dialogRef = this._matDialog.open(SalesOrderFormDialogComponent, {
            panelClass: 'order-form-dialog',
            data      : {
                action: 'new'
            }
        });
    }

    editOrder(order) {
        this.dialogRef = this._matDialog.open(SalesOrderFormDialogComponent, {
            panelClass: 'order-form-dialog',
            data      : {
                order: order,
                action: 'edit'
            }
        });
    }

    createInvoice(order) {
        this.dialogRef = this._matDialog.open(SalesInvoiceFormDialogComponent, {
            panelClass: 'invoice-form-dialog',
            data      : {
                order: order,
                action: 'bill'
            }
        });
    }

}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {OrdersService} _ordersService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _ordersService: OrdersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._ordersService.orders;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._ordersService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._ordersService.orders.slice();

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
                case 'number':
                    [propertyA, propertyB] = [a.number, b.number];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [a.customer.id, b.customer.id];
                    break;
                case 'orderDate':
                    [propertyA, propertyB] = [a.orderDate, b.orderDate];
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
