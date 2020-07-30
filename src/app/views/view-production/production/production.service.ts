import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {Production} from '../../../data/models/production.model';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';

@Injectable({
    providedIn: 'root'
})
export class ProductionService implements Resolve<any>
{
    routeParams: any;
    production: Production;
    onProductionChanged: BehaviorSubject<any>;
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
        this.onProductionChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/productions';
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
                this.getProduction()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get production
     *
     * @returns {Promise<any>}
     */
    getProduction(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductionChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(this.serviceURL + '/' + this.routeParams.id, this.httpOptions)
                    .subscribe((response: any) => {
                        this.production = response['response'];
                        this.onProductionChanged.next(this.production);
                        resolve(response['response']);
                    }, reject);
            }
        });
    }

    create(production: Production) {
        return this._httpClient.post(this.serviceURL + '/save', production, this.httpOptions);
    }

    update(production: Production) {
        return this._httpClient.put(this.serviceURL + '/update', production, this.httpOptions);
    }

}
