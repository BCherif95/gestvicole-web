import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Production} from '../../../data/models/production.model';
import {SearchDateBody} from '../../../utils/search-date-body';

@Injectable({
    providedIn: 'root'
})
export class ProductionsService implements Resolve<any>
{
    productions: Production[];
    onProductionsChanged: BehaviorSubject<any>;
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
        this.onProductionsChanged = new BehaviorSubject({});
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.geProductions()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get productions
     *
     * @returns {Promise<any>}
     */
    geProductions(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.productions = response['response'];
                    this.onProductionsChanged.next(this.productions);
                    resolve(response['response']);
                }, reject);
        });
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/all-day',this.httpOptions);
    }

    getById(id: number) {
        return this._httpClient.get(this.serviceURL + '/' + id, this.httpOptions);
    }

    exportExcelProductions(searchDateBody : SearchDateBody): Observable<any> {
        return this._httpClient.post(this.serviceURL + '/export/excel',searchDateBody,this.httpOptions);
    }
}
