import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {User} from '../../../data/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService implements Resolve<any>
{
    routeParams: any;
    user: User;
    onUserChanged: BehaviorSubject<any>;
    readonly httpOptions: any;
    readonly serviceURL: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private pu: ProjectUtils
    )
    {
        // Set the defaults
        this.onUserChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/users';
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUser()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get user
     *
     * @returns {Promise<any>}
     */
    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id=== 'new' )
            {
                this.onUserChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(this.serviceURL + '/' + this.routeParams.id +'/getUser', this.pu.httpHeaders())
                    .subscribe((response: any) => {
                        this.user = response['response'];
                        this.onUserChanged.next(this.user);
                        resolve(response['response']);
                    }, reject);
            }
        });
    }

    public save(user: User) {
        return this._httpClient.post(this.serviceURL + '/save', user, this.pu.httpHeaders());
    }

    public update(user: User) {
        return this._httpClient.put(this.serviceURL + '/update', user, this.pu.httpHeaders());
    }

    findAuthzRoles(id: number): Observable<any> {
        return this._httpClient.get(this.serviceURL + '/' + id + '/roles', this.pu.httpHeaders());
    }
}
