import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Category} from '../../../data/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService implements Resolve<any>
{
    categories: Category[];
    onCategoriesChanged: BehaviorSubject<any>;
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
        this.onCategoriesChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/categories';
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
                this.getCategories()
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
    getCategories(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.categories = response['response'];
                    this.onCategoriesChanged.next(this.categories);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(category: Category) {
        return this._httpClient.post(this.serviceURL + '/save', category, this.httpOptions);
    }

    update(category: Category) {
        return this._httpClient.put(this.serviceURL + '/update', category, this.httpOptions);
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
