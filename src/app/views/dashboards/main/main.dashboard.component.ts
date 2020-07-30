import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MainDashboardService} from './main.dashboard.service';
import {ProjectUtils} from '../../../utils/project-utils';
import {User} from '../../../data/models/user.model';
import {ProdDashBody} from '../../../utils/dashboard/prod-dash-body';
import {Building} from '../../../data/models/building.model';
import {ViewProductionBuildingsService} from '../../view-production/buildings/buildings.service';
import {SaleDashBody} from '../../../utils/dashboard/sale-dash-body';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {ChargeDashBody} from '../../../utils/dashboard/charge-dash-body';
import {SearchBody} from '../../../utils/search-body';

@Component({
    selector: 'main-dashboard',
    templateUrl: './main.dashboard.component.html',
    styleUrls: ['./main.dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MainDashboardComponent implements OnInit {
    prodDashBody: ProdDashBody;
    saleDashBody: SaleDashBody;
    chargeDashBody: ChargeDashBody;
    buildingSelected: Building;
    dateSelected: Date;
    margeDateSelected: Date;
    saleDateSelected: Date;
    today: Date = new Date();
    buildings: Building[];
    projectUtils = new ProjectUtils();
    currentUser: User = this.projectUtils.getAppUser();

    week: string[] = [];
    datasets1: number[] = [];
    datasets2: number[] = [];

    prodWeek: string[] = [];
    prodDatasets1: number[] = [];
    prodDatasets2: number[] = [];

    months: string[] = [];
    dataset: number[] = [];
    saleDatasets2: number[] = [];

    days: string[] = [];
    data: number[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;


    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MainDashboardService} _mainDashboardService
     * @param _viewProductionBuildingsService
     * @param _router
     * @param _location
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _mainDashboardService: MainDashboardService,
        private _viewProductionBuildingsService: ViewProductionBuildingsService,
        private _router: Router,
        public _location: Location
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
        this.today = new Date();
        document.title = 'GESTION AVICOLE | Tableau board';
        this.findAllBuilding();
        this.initProdDashBody();
        this.initSaleDashBody();
        this.initChargeDashBody();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    initProdDashBody() {
        this._mainDashboardService.searchBody = new SearchBody();
        this.loadProdDashBody(this._mainDashboardService.searchBody);
    }

    initChargeDashBody() {
        this._mainDashboardService.searchBody = new SearchBody();
        this.loadSaleDashBody(this._mainDashboardService.searchBody);
    }

    initSaleDashBody() {
        this._mainDashboardService.searchBody = new SearchBody();
        this.loadChargeDashBody(this._mainDashboardService.searchBody);
    }


    findAllBuilding() {
        return this._viewProductionBuildingsService.findAllBuilding().subscribe(value => {
            this.buildings = value['response'];
        }, error => console.log(error));
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    onChangeBuilding(building: Building) {
        this.buildingSelected = building;
        this._mainDashboardService.searchBody.buildingId = this.buildingSelected.id;
        this._mainDashboardService.searchBody.date = this.dateSelected;
        this.loadProdDashBody(this._mainDashboardService.searchBody);
    }

    allProductions() {
        this._mainDashboardService.searchBody = new SearchBody();
        this.loadProdDashBody(this._mainDashboardService.searchBody);
    }

    searchDateSelected(event) {
        this.dateSelected = new Date(event.value);
        this._mainDashboardService.searchBody.buildingId = this.buildingSelected.id;
        this._mainDashboardService.searchBody.date = this.dateSelected;
        this.loadProdDashBody(this._mainDashboardService.searchBody);
    }

    searchMargeByDate(event) {
        this.margeDateSelected = new Date(event.value);
        this._mainDashboardService.searchBody.date = this.margeDateSelected;
        this.loadChargeDashBody(this._mainDashboardService.searchBody);
    }

    searchSaleByDate(event) {
        this.saleDateSelected = new Date(event.value);
        this._mainDashboardService.searchBody.date = this.saleDateSelected;
        this.loadSaleDashBody(this._mainDashboardService.searchBody);
    }

    loadChargeDashBody(value){
        this._mainDashboardService.getChargeDashBody(value).subscribe(value => {
            this.chargeDashBody = value['response'];
            this.week = [];
            this.datasets1 = [];
            this.datasets2 = [];
            this.chargeDashBody.lineGraphBodies.forEach(item => {
                this.week.push(item.name);
                this.datasets1.push(item.datasets1);
                this.datasets2.push(item.datasets2);
            });
        }, error => console.log(error));
    }

    loadProdDashBody(data) {
        this._mainDashboardService.getProdDashBody(data).subscribe(data => {
            this.prodDashBody = data['response'];
            this.prodWeek = [];
            this.prodDatasets1 = [];
            this.prodDatasets2 = [];
            this.prodDashBody.lineGraphBodies.forEach(item => {
                this.prodWeek.push(item.name);
                this.prodDatasets1.push(item.datasets1);
                this.prodDatasets2.push(item.datasets2);
            });
        }, error => console.log(error));
    }

    loadSaleDashBody(data) {
        this._mainDashboardService.getInvoiceDashBody(data).subscribe(data => {
            this.saleDashBody = data['response'];
            this.months = [];
            this.dataset = [];
            this.saleDashBody.saleGraphBodies.forEach(item => {
                this.months.push(item.name);
                this.dataset.push(item.value);
            });
        }, error => console.log(error));
    }
}


