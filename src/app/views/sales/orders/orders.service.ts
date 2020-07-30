import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Building} from '../../../data/models/building.model';
import {Customer} from '../../../data/models/customer.model';
import {Order} from '../../../data/models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService implements Resolve<any>
{
    orders: Order[];
    onOrdersChanged: BehaviorSubject<any>;
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
        this.onOrdersChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/orders';
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
                this.getOrders()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get orders
     *
     * @returns {Promise<any>}
     */
    getOrders(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.orders = response['response'];
                    this.onOrdersChanged.next(this.orders);
                    resolve(response['response']);
                }, reject);
        });
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/by-waiting',this.httpOptions);
    }

    create(order: Order) {
        return this._httpClient.post(this.serviceURL + '/save', order, this.httpOptions);
    }

    update(order: Order) {
        return this._httpClient.put(this.serviceURL + '/update', order, this.httpOptions);
    }

    getById(id: number) {
        return this._httpClient.get(this.serviceURL + '/' + id, this.httpOptions);
    }

}
