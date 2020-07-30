import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {ToastrService} from 'ngx-toastr';
import {StockEntriesService} from './stock-entries.service';
import {StockEntryComponent} from '../stock-entry/stock-entry.component';

@Component({
    selector     : 'stock-management-stock-entries',
    templateUrl  : './stock-entries.component.html',
    styleUrls    : ['./stock-entries.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class StockEntriesComponent implements OnInit
{
    dialogRef: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['date', 'product','quantityEntry','observation'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _stockEntriesService: StockEntriesService,
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
        this.dataSource = new FilesDataSource(this._stockEntriesService, this.paginator, this.sort);

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

    newEntry() {
        this.dialogRef = this._matDialog.open(StockEntryComponent, {
            panelClass: 'stock-entry-dialog',
            data      : {
                action: 'new'
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
     * @param _stockEntriesService
     * @param _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _stockEntriesService: StockEntriesService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._stockEntriesService.stockEntries;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._stockEntriesService.onStockEntriesChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._stockEntriesService.stockEntries.slice();

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
                case 'quantityEntry':
                    [propertyA, propertyB] = [a.quantityEntry, b.quantityEntry];
                    break;
                case 'observation':
                    [propertyA, propertyB] = [a.observation, b.observation];
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
