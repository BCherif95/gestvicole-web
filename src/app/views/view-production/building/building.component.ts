import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import {Building} from '../../../data/models/building.model';
import {ViewProductionBuildingService} from './building.service';
import {LayerType} from '../../../data/models/layer.type.model';
import {BuildingSaveEntity} from '../../../data/wrapper/building.save.entity.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LayerTypeService} from '../../../services/layer.type.service';
import {RoleHelpers} from '../../../authz/role.helpers';

@Component({
    selector     : 'view-production-building',
    templateUrl  : './building.component.html',
    styleUrls    : ['./building.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ViewProductionBuildingComponent implements OnInit, OnDestroy
{
    building: Building;
    buildingSaveEntity: BuildingSaveEntity;
    pageType: string;
    total: number = 0;
    buildingForm: FormGroup;
    layerTypes: LayerType[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ViewProductionBuildingService} _viewProductionBuildingService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     * @param _toastService
     * @param _layerTypeService
     * @param _router
     * @param roleHelpers
     */
    constructor(
        private _viewProductionBuildingService: ViewProductionBuildingService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _toastService: ToastrService,
        private _layerTypeService: LayerTypeService,
        private _router: Router,
        private roleHelpers: RoleHelpers
    )
    {
        // Set the default
        this.building = new Building();

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
        this.layerTypes = [];
        this.createInvoice();
        // Subscribe to update product on changes
        this._viewProductionBuildingService.onBuildingChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(building => {

                if ( building )
                {
                    this.findAllByBuildingId(building.id);
                    this.total = building.totalLayer;
                    this.buildingForm.get('id').setValue(building.id);
                    this.buildingForm.get('name').setValue(building.name);
                    this.buildingForm.get('description').setValue(building.description);
                    this.building = new Building(building);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.building = new Building();
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

    /**
     * Create building form
     *
     * @returns {FormGroup}
     */
    createInvoice() {
        this.buildingForm = this._formBuilder.group({
            id: new FormControl(''),
            name: new FormControl('', Validators.required),
            description: new FormControl('')
        });
        this.addNewRow();
    }

    addNewRow() {
        let size = this.layerTypes.length;
        let newLine = new LayerType();
        this.layerTypes.splice(size + 1, 0, newLine);
    }

    onLineChanged(index: number) {
        let row: LayerType = this.layerTypes[index];
        if (row.quantity) {
            this.layerTypes[index] = row;
        }
        this.onTotalCalculate();
    }

    onTotalCalculate(){
        this.total = this.layerTypes.map(c => c.quantity)
                .reduce((sum, current) => sum + current, 0);
    }
    deleteLine(index: number) {
        this.layerTypes.splice(index, 1);
        this.onTotalCalculate();
    }

    isLinesCorrect(): boolean {
        let ret: boolean = true;
        if (this.layerTypes.length < 1) {
            ret = false;
        } else if (this.total <= 0) {
            ret = false;
        } else {
            for (let item of this.layerTypes) {
                if (!item.name || !item.quantity || item.name.length <= 0 || item.quantity <= 0) {
                    return false;
                }
            }
        }
        return ret;
    }

    findAllByBuildingId(id: number) {
        return this._layerTypeService.findAllByBuildingId(id).subscribe(value => {
            this.layerTypes = value;
            // console.log(this.invoiceLines);
        }, error => console.log(error));
    }

    save() {
        this.building = new Building();
        this.buildingSaveEntity = new BuildingSaveEntity();
        this.building = this.buildingForm.getRawValue();
        this.building.totalLayer = this.total;
        this.buildingSaveEntity.building = this.building;
        this.buildingSaveEntity.layerTypes = this.layerTypes;
        if (!this.building.id) {
            this._viewProductionBuildingService.createBuilding(this.buildingSaveEntity).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._router.navigateByUrl('/tr/production/buildings');
                } else {
                    this._toastService.error(data['message']);
                }
            });
        }else {
            this._viewProductionBuildingService.updateBuilding(this.buildingSaveEntity).subscribe(data => {
                if (data['status'] === 'OK') {
                    this._toastService.success(data['message']);
                    this._router.navigateByUrl('/tr/production/buildings');
                } else {
                    this._toastService.error(data['message']);
                }
            });
        }
    }

    has(scope: string): boolean {
        return this.roleHelpers.hasRole('building', scope);
    }
}
