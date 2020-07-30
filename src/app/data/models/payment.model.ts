import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {METHOD_OF_PAYMENT, PAYMENT_STATE} from '../enums/enums';
import {Invoice} from './invoice.model';

@Injectable()
export class Payment implements Deserializable {

    id?: number;
    reference?: string;
    amount?: number;
    balanceBefore?: number;
    balanceAfter?: number;
    canceled?: boolean = false;
    state?: PAYMENT_STATE;
    methodOfPayment?: METHOD_OF_PAYMENT;
    paymentDate?: Date;
    invoice?: Invoice;

    constructor(payment?) {
        payment = payment || {};
        this.id = payment.id || 0;
        this.reference = payment.reference;
        this.amount = payment.amount;
        this.balanceBefore = payment.balanceBefore;
        this.balanceAfter = payment.balanceAfter;
        this.canceled = payment.canceled;
        this.state = payment.state;
        this.methodOfPayment = payment.methodOfPayment;
        this.paymentDate = payment.paymentDate;
        this.invoice = payment.invoice;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
