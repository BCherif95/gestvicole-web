import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {Building} from '../../../data/models/building.model';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {BuildingSaveEntity} from '../../../data/wrapper/building.save.entity.model';

@Injectable({
    providedIn: 'root'
})
export class ViewProductionBuildingService implements Resolve<any>
{
    routeParams: any;
    building: Building;
    onBuildingChanged: BehaviorSubject<any>;
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
        this.onBuildingChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getBuilding()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get building
     *
     * @returns {Promise<any>}
     */
    getBuilding(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onBuildingChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(this.serviceURL + '/' + this.routeParams.id, this.httpOptions)
                    .subscribe((response: any) => {
                        this.building = response['response'];
                        this.onBuildingChanged.next(this.building);
                        resolve(response['response']);
                    }, reject);
            }
        });
    }

    createBuilding(buildingSaveEntity: BuildingSaveEntity) {
        return this._httpClient.post(this.serviceURL + '/save', buildingSaveEntity, this.httpOptions);
    }

    updateBuilding(buildingSaveEntity: BuildingSaveEntity) {
        return this._httpClient.put(this.serviceURL + '/update', buildingSaveEntity, this.httpOptions);
    }

}
