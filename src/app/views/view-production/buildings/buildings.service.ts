import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Building} from '../../../data/models/building.model';

@Injectable({
    providedIn: 'root'
})
export class ViewProductionBuildingsService implements Resolve<any>
{
    buildings: Building[];
    onBuildingsChanged: BehaviorSubject<any>;
    readonly httpOptions: any;
    readonly serviceURL: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onBuildingsChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/buildings';
        this.httpOptions = new ProjectUtils().httpHeaders();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.geBuildings()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get buidings
     *
     * @returns {Promise<any>}
     */
    geBuildings(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.buildings = response['response'];
                    this.onBuildingsChanged.next(this.buildings);
                    resolve(response['response']);
                }, reject);
        });
    }

    findAllBuilding(): Observable<HttpEvent<Building[]>> {
        return this._httpClient.get<Building[]>(this.serviceURL + '/all', this.httpOptions);
    }

    getBuildingById(id: number) {
        return this._httpClient.get(this.serviceURL + '/' + id, this.httpOptions);
    }
}
