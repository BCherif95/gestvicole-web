import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {Product} from '../../../data/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService implements Resolve<any>
{
    products: Product[];
    onProductsChanged: BehaviorSubject<any>;
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
        this.onProductsChanged = new BehaviorSubject({});
        this.serviceURL = environment.serviceUrl + '/products';
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
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.serviceURL+ '/all',this.httpOptions)
                .subscribe((response: any) => {
                    this.products = response['response'];
                    this.onProductsChanged.next(this.products);
                    resolve(response['response']);
                }, reject);
        });
    }

    create(product: Product) {
        return this._httpClient.post(this.serviceURL + '/save', product, this.httpOptions);
    }

    getAll(){
        return this._httpClient.get(this.serviceURL+ '/all',this.httpOptions);
    }

    update(product: Product) {
        return this._httpClient.put(this.serviceURL + '/update', product, this.httpOptions);
    }

    getById(id: number) {
        return this._httpClient.get(this.serviceURL + '/' + id, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this._httpClient.delete(this.serviceURL + '/' + id + '/delete', this.httpOptions);
    }

}
