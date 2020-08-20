import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatDialogRef} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {METHOD_OF_PAYMENT, PAYMENT_STATE} from '../../../data/enums/enums';
import {PaymentsService} from './payments.service';
import {SalesPaymentFormDialogComponent} from '../payment-form/payment-form.component';
import {Payment} from '../../../data/models/payment.model';
import { ConfirmDialogComponent } from 'app/views/confirm-dialog/confirm-dialog.component';
import {ProjectUtils} from '../../../utils/project-utils';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector     : 'sales-payments',
    templateUrl  : './payments.component.html',
    styleUrls    : ['./payments.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit
{
    projectUtils = new ProjectUtils();
    currentUser = this.projectUtils.getAppUser();
    dialogRef: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['customer','invoice','netToPay','paymentDate','balanceBefore','amount','balanceAfter','methodOfPayment','createBy','state','validateBy','buttons'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    paymentState = PAYMENT_STATE;
    methodOfPaymentEnum = METHOD_OF_PAYMENT;

    @ViewChild('filter')
    filter: ElementRef;

    confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;


    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _paymentsService: PaymentsService,
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
        this.dataSource = new FilesDataSource(this._paymentsService, this.paginator, this.sort);

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

    showPaymentDialog(action?: string, payment?: Payment) {
        this.dialogRef = this._matDialog.open(SalesPaymentFormDialogComponent, {
            panelClass: 'payment-form-dialog',
            data: {
                action: action,
                payment: payment
            }
        });
    }

    cancelPayment(payment: Payment) {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Etes-vous sûre d\'annuler ce paiement ?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                payment.cancelBy = this.projectUtils.getAppUser();
                payment.cancelDate = new Date();
                this._paymentsService.cancelPayment(payment).subscribe(data => {
                    if (data['status'] === 'OK') {
                        this._toastService.success(data['message']);
                        const payIndex = this._paymentsService.payments.indexOf(payment);
                        this._paymentsService.payments.splice(payIndex, 1);
                        this._paymentsService.onPaymentsChanged.next(this._paymentsService.payments);
                    } else {
                        this._toastService.error(data['message']);
                    }
                }, error => console.log(error));
            }
            this.confirmDialogRef = null;
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
     * @param _paymentsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _paymentsService: PaymentsService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._paymentsService.payments;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._paymentsService.onPaymentsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._paymentsService.payments.slice();

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
                case 'invoice':
                    [propertyA, propertyB] = [a.number, b.number];
                    break;
                case 'paymentDate':
                    [propertyA, propertyB] = [a.customer.name, b.customer.name];
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
