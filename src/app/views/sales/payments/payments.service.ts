import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Payment} from '../../../data/models/payment.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService implements Resolve<any>
{
    payments: Payment[];
    onPaymentsChanged: BehaviorSubject<any>;
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
        this.onPaymentsChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/payments';
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
                this.getPayments()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get payments
     *
     * @returns {Promise<any>}
     */
    getPayments(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.payments = response['response'];
                    this.onPaymentsChanged.next(this.payments);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(payment: Payment) {
        return this._httpClient.post(this.serviceURL + '/save', payment, this.httpOptions);
    }

    update(payment: Payment) {
        return this._httpClient.put(this.serviceURL + '/update', payment, this.httpOptions);
    }

}
