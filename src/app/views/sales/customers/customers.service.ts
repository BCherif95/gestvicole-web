import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Customer} from '../../../data/models/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomersService implements Resolve<any>
{
    customers: Customer[];
    onCustomersChanged: BehaviorSubject<any>;
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
        this.onCustomersChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/customers';
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
                this.geCustomers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get customers
     *
     * @returns {Promise<any>}
     */
    geCustomers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.customers = response['response'];
                    this.onCustomersChanged.next(this.customers);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(customer: Customer) {
        return this._httpClient.post(this.serviceURL + '/save', customer, this.httpOptions);
    }

    update(customer: Customer) {
        return this._httpClient.put(this.serviceURL + '/update', customer, this.httpOptions);
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/all',this.httpOptions);
    }

    getById(id: number) {
        return this._httpClient.get(this.serviceURL + '/' + id, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this._httpClient.delete(this.serviceURL + '/' + id + '/delete', this.httpOptions);
    }

}
