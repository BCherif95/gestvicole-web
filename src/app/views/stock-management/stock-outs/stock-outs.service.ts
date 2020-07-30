import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {StockOut} from '../../../data/models/stock.out.model';

@Injectable({
    providedIn: 'root'
})
export class StockOutsService implements Resolve<any>
{
    stockOuts: StockOut[];
    onStockOutsChanged: BehaviorSubject<any>;
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
        this.onStockOutsChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/stock-outs';
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
                this.getStockOuts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get stockOuts
     *
     * @returns {Promise<any>}
     */
    getStockOuts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.stockOuts = response['response'];
                    this.onStockOutsChanged.next(this.stockOuts);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(stockOut: StockOut) {
        return this._httpClient.post(this.serviceURL + '/save', stockOut, this.httpOptions);
    }

    validateStockOut(stockOut: StockOut) {
        return this._httpClient.post(this.serviceURL + '/validate', stockOut, this.httpOptions);
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/all',this.httpOptions);
    }

}
