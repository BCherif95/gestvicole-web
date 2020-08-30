import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Invoice} from '../../../data/models/invoice.model';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService implements Resolve<any>
{
    invoices: Invoice[];
    onInvoicesChanged: BehaviorSubject<any>;
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
        this.onInvoicesChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/invoices';
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
                this.getInvoices()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get invoices
     *
     * @returns {Promise<any>}
     */
    getInvoices(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.invoices = response['response'];
                    this.onInvoicesChanged.next(this.invoices);
                    resolve(response['response']);
                }, reject);
        });
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/all',this.httpOptions);
    }

    validateAnInvoice(invoice: Invoice) {
        return this._httpClient.put(this.serviceURL + '/an-validate', invoice, this.httpOptions);
    }

    getById(id: number) {
        return this._httpClient.get(this.serviceURL + '/' + id, this.httpOptions);
    }

    create(invoice: Invoice) {
        return this._httpClient.post(this.serviceURL + '/save', invoice, this.httpOptions);
    }

    update(invoice: Invoice) {
        return this._httpClient.put(this.serviceURL + '/update', invoice, this.httpOptions);
    }

}
