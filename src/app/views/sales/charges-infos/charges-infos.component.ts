import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {Charge} from '../../../data/models/charge.model';
import {ChargeItem} from '../../../data/wrapper/charge.item.model';
import {ChargesInfosService} from './charges-infos.service';


@Component({
    selector: 'sales-charges-infos',
    templateUrl: './charges-infos.component.html',
    styleUrls: ['./charges-infos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChargesInfosComponent implements OnInit, OnDestroy {

    charge: Charge;
    chargeItems: ChargeItem[] = [];
    total: number = 0;
    totalEffective: number = 0;
    consumption: number = 0;
    totalLoad: number = 0;
    netMargin: number = 0;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _chargesInfosService: ChargesInfosService
    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Set the defaults
        this.charge = new Charge();

        // Subscribe to update order on changes
        this._chargesInfosService.onChargeChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(charge => {
                this.getChargeItems(charge);
                this.charge = new Charge(charge);
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    getChargeItems(charge: Charge) {
        return this._chargesInfosService.getChargeInfos(charge.id).subscribe(value => {
            this.chargeItems = value['response'][0];
            this.totalProdCalculate();
            this.totalEffCalculate();
            this.consumption = this.totalEffective * charge.costOfDay;
            this.totalLoad = this.consumption + charge.dailyCharge;
            this.netMargin = this.total - this.totalLoad;
        }, error => console.log(error));
    }

    totalProdCalculate(){
        this.total = this.chargeItems.map(c => c.total)
            .reduce((sum, current) => sum + current, 0);
    }

    totalEffCalculate(){
        this.totalEffective = this.chargeItems.map(c => c.effective)
            .reduce((sum, current) => sum + current, 0);
    }




}
