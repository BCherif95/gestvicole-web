import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Charge} from '../../../data/models/charge.model';
import {ProjectUtils} from '../../../utils/project-utils';

@Injectable({
    providedIn: 'root'
})
export class ChargesInfosService implements Resolve<any> {
    routeParams: any;
    charge: Charge;
    onChargeChanged: BehaviorSubject<any>;
    readonly httpOptions: any;
    readonly serviceURL: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        this.httpOptions = new ProjectUtils().httpHeaders();
        // Set the defaults
        this.onChargeChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/charges';
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCharge()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get charge
     *
     * @returns {Promise<any>}
     */
    getCharge(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL + '/' + this.routeParams.id, this.httpOptions)
                .subscribe((response: any) => {
                    this.charge = response['response'];
                    this.onChargeChanged.next(this.charge);
                    resolve(response['response']);
                }, reject);
        });
    }

    getChargeInfos(id: number){
        return this._httpClient.get(this.serviceURL+ '/info/' + id,this.httpOptions);
    }


}
