import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {StockEntry} from '../../../data/models/stock.entry.model';

@Injectable({
    providedIn: 'root'
})
export class StockEntriesService implements Resolve<any>
{
    stockEntries: StockEntry[];
    onStockEntriesChanged: BehaviorSubject<any>;
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
        this.onStockEntriesChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/stock-entries';
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
                this.getStockEntries()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get stockEntries
     *
     * @returns {Promise<any>}
     */
    getStockEntries(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.stockEntries = response['response'];
                    this.onStockEntriesChanged.next(this.stockEntries);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(stockEntry: StockEntry) {
        return this._httpClient.post(this.serviceURL + '/save', stockEntry, this.httpOptions);
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/all',this.httpOptions);
    }

}
