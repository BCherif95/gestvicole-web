import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {ProjectUtils} from '../../../utils/project-utils';
import {environment} from '../../../../environments/environment';
import {SearchBody} from '../../../utils/search-body';

@Injectable()
export class MainDashboardService implements Resolve<any>
{
    searchBody = new SearchBody();
    readonly httpOptions: any;
    readonly serviceProdDashboardURL: string;
    readonly serviceInvoiceDashboardURL: string;
    readonly serviceChargeDashboardURL: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        this.httpOptions = new ProjectUtils().httpHeaders();
        this.serviceProdDashboardURL = environment.serviceUrl + '/productions';
        this.serviceInvoiceDashboardURL = environment.serviceUrl + '/invoices';
        this.serviceChargeDashboardURL = environment.serviceUrl + '/charges';
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
                this.getProdDashBody(this.searchBody),
                this.getInvoiceDashBody(this.searchBody),
                this.getChargeDashBody(this.searchBody)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }



    /**
     * Get prodDashBody
     */
    getProdDashBody(searchBody?: SearchBody){
        return this._httpClient.post(this.serviceProdDashboardURL + '/dashboard', searchBody, this.httpOptions);
    }

    /**
     * Get invoiceDashBody
     */
    getInvoiceDashBody(searchBody?: SearchBody){
        return this._httpClient.post(this.serviceInvoiceDashboardURL + '/dashboard', searchBody, this.httpOptions);
    }

    /**
     * Get chargeDashBody
     */
    getChargeDashBody(searchBody?: SearchBody){
        return this._httpClient.post(this.serviceChargeDashboardURL + '/dashboard', searchBody, this.httpOptions);
    }

}
