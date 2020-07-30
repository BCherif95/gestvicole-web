import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Charge} from '../../../data/models/charge.model';

@Injectable({
    providedIn: 'root'
})
export class ChargesService implements Resolve<any>
{
    charges: Charge[];
    onChargesChanged: BehaviorSubject<any>;
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
        this.onChargesChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/charges';
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
                this.getCharges()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get charges
     *
     * @returns {Promise<any>}
     */
    getCharges(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.charges = response['response'];
                    this.onChargesChanged.next(this.charges);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(charge: Charge) {
        return this._httpClient.post(this.serviceURL + '/save', charge, this.httpOptions);
    }

    update(charge: Charge) {
        return this._httpClient.put(this.serviceURL + '/update', charge, this.httpOptions);
    }


}
