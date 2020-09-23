import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatDialogRef} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {ToastrService} from 'ngx-toastr';
import {StockOutsService} from './stock-outs.service';
import {StockOutComponent} from '../stock-out/stock-out.component';
import {StockOut} from '../../../data/models/stock.out.model';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';
import {STOCK_OUT_STATE} from '../../../data/enums/enums';
import {RoleHelpers} from '../../../authz/role.helpers';

@Component({
    selector     : 'stock-management-stock-outs',
    templateUrl  : './stock-outs.component.html',
    styleUrls    : ['./stock-outs.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class StockOutsComponent implements OnInit
{
    dialogRef: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['date', 'product','quantityOut','user','state','buttons'];

    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    stockOutState = STOCK_OUT_STATE;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _stockOutsService: StockOutsService,
        private _toastService: ToastrService,
        private _matDialog: MatDialog,
        private roleHelpers: RoleHelpers,
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
        this.dataSource = new FilesDataSource(this._stockOutsService, this.paginator, this.sort);

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

    newOut() {
        this.dialogRef = this._matDialog.open(StockOutComponent, {
            panelClass: 'stock-out-dialog',
            data      : {
                action: 'new'
            }
        });
    }

    validation(stockOut: StockOut) {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes-vous sûre de valider cette sortie ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._stockOutsService.validateStockOut(stockOut).subscribe(data => {
                    if (data['status'] === 'OK') {
                        this._toastService.success(data['message']);
                        const stockOutIndex = this._stockOutsService.stockOuts.indexOf(stockOut);
                        this._stockOutsService.stockOuts.splice(stockOutIndex, 1, data['response']);
                        this._stockOutsService.onStockOutsChanged.next(this._stockOutsService.stockOuts);
                    } else {
                        this._toastService.error(data['message']);
                    }
                }, error => console.log(error));
            }
        });
    }

    has(scope: string): boolean {
        return this.roleHelpers.hasRole('stock_out', scope);
    }
}


export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     * @param _stockOutsService
     * @param _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _stockOutsService: StockOutsService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._stockOutsService.stockOuts;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._stockOutsService.onStockOutsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._stockOutsService.stockOuts.slice();

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
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
                case 'quantityOut':
                    [propertyA, propertyB] = [a.quantityOut, b.quantityOut];
                    break;
                case 'user':
                    [propertyA, propertyB] = [a.user.firstname, b.user.firstname];
                    break;
                case 'product':
                    [propertyA, propertyB] = [a.product.name, b.product.name];
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
