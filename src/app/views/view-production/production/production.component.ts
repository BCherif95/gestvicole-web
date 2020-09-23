import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import {Production} from '../../../data/models/production.model';
import {ProductionService} from './production.service';
import {ViewProductionBuildingsService} from '../buildings/buildings.service';
import {Building} from '../../../data/models/building.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector     : 'view-production-production',
    templateUrl  : './production.component.html',
    styleUrls    : ['./production.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProductionComponent implements OnInit, OnDestroy
{
    production: Production;
    buildings: Building[];
    building: Building;
    pageType: string;
    productionForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param _productionService
     * @param _viewProductionBuildingsService
     * @param _toastService
     * @param _router
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _productionService: ProductionService,
        private _viewProductionBuildingsService: ViewProductionBuildingsService,
        private _toastService: ToastrService,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.production = new Production();

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
        this.findAllBuilding();
        this.createProduction();
        // Subscribe to update product on changes
        this._productionService.onProductionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(production => {

                if ( production )
                {
                    this.getBuildingById(production.building.id);
                    this.productionForm.get('id').setValue(production.id);
                    this.productionForm.get('overallProduction').setValue(production.overallProduction);
                    this.productionForm.get('mortality').setValue(production.mortality);
                    this.productionForm.get('generalEffective').setValue(production.generalEffective);
                    this.productionForm.get('building').setValue(production.building.id);
                    this.productionForm.get('alveolusBroken').setValue(production.alveolusBroken);
                    this.productionForm.get('prodDoubleYellow').setValue(production.prodDoubleYellow);
                    this.productionForm.get('prodSmallAlveolus').setValue(production.prodSmallAlveolus);
                    this.productionForm.get('date').setValue(new Date(production.date));
                    this.production = new Production(production);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.production = new Production();
                }

            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    findAllBuilding() {
        return this._viewProductionBuildingsService.findAllBuilding().subscribe(value => {
            this.buildings = value['response'];
        }, error => console.log(error));
    }

    getBuildingById(id: number) {
        return this._viewProductionBuildingsService.getBuildingById(id).subscribe(data => {
            this.building = data['response'];
            console.log(this.production);
            if (this.building) {
                this.productionForm.get('generalEffective').setValue(this.building.totalLayer);
            }
        }, error => console.log(error));
    }

    findBuildingSelected(value: number) {
        this.getBuildingById(value);
    }


    /**
     * Create production form
     *
     * @returns {FormGroup}
     */
    createProduction() {
        this.productionForm = this._formBuilder.group({
            id: new FormControl(''),
            overallProduction: new FormControl('', Validators.required),
            mortality: new FormControl('', Validators.required),
            generalEffective: new FormControl('', Validators.required),
            building: new FormControl('', Validators.required),
            date: new FormControl(new Date(), Validators.required),
            alveolusBroken: new FormControl('', Validators.required),
            prodDoubleYellow: new FormControl('', Validators.required),
            prodSmallAlveolus: new FormControl('', Validators.required)
        });
        this.productionForm.get('building').valueChanges.subscribe(value => this.production.building = value);
    }

    save() {
        this.production = new Production();
        this.production = this.productionForm.getRawValue();
        this.production.building = this.building;
        if (!this.production.id) {
            this._productionService.create(this.production).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._router.navigateByUrl('/tr/production/productions');
                } else {
                    this._toastService.error(data['message']);
                }
            });
        }else {
            this._productionService.update(this.production).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._router.navigateByUrl('/tr/production/productions');
                } else {
                    this._toastService.error(data['message']);
                }
            });
        }
    }

}
