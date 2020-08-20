import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Invoice} from '../../../data/models/invoice.model';
import {ProjectUtils} from '../../../utils/project-utils';
import {environment} from '../../../../environments/environment';
import {Payment} from '../../../data/models/payment.model';
import {PaymentsService} from '../payments/payments.service';

@Injectable({
    providedIn: 'root'
})
export class InvoicePrintService implements Resolve<any> {
    routeParams: any;
    invoice: Invoice;
    payment: Payment;
    onInvoiceChanged: BehaviorSubject<any>;
    onPaymentChanged: BehaviorSubject<any>;
    readonly httpOptions: any;
    readonly serviceURL: string;

    /**
     * Constructor
     *
     *
     * @param {HttpClient} _httpClient
     * @param _paymentsService
     */
    constructor(
        private _httpClient: HttpClient,
        private _paymentsService: PaymentsService
    ) {
        // Set the defaults
        this.onInvoiceChanged = new BehaviorSubject({});
        this.onPaymentChanged = new BehaviorSubject({});
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getInvoicePrint(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get invoice
     *
     * @returns {Promise<any>}
     */
    getInvoicePrint(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onInvoiceChanged.next(false);
                resolve(false);
            } else {
                this._paymentsService.get(this.routeParams.id).subscribe(ret => {
                    if (ret['status'] === 'OK') {
                        this.payment = ret['response'];
                        this.onPaymentChanged.next(this.payment);
                        this._httpClient.get(this.serviceURL + '/' + this.payment.invoice.id, this.httpOptions)
                            .subscribe((response: any) => {
                                this.invoice = response['response'];
                                this.onInvoiceChanged.next(this.invoice);
                                resolve(response['response']);
                            }, reject);
                    }
                });
            }
        });
    }


}
