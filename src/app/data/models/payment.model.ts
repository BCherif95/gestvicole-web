import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {METHOD_OF_PAYMENT, PAYMENT_STATE} from '../enums/enums';
import {Invoice} from './invoice.model';
import {User} from './user.model';

@Injectable()
export class Payment implements Deserializable {

    id?: number;
    number?: string;
    reference?: string;
    paymentDate?: Date;
    cancelDate?: Date;
    amount?: number;
    balanceBefore?: number;
    balanceAfter?: number;
    netToPay?: number;
    accountPaidBefore?: number;
    accountPaidAfter?: number;
    canceled?: boolean = false;
    state?: PAYMENT_STATE;
    methodOfPayment?: METHOD_OF_PAYMENT;
    invoice?: Invoice;
    createBy?: User;
    validateBy?: User;
    cancelBy?: User;
    amountInLetter?: string;

    constructor(payment?) {
        payment = payment || {};
        this.id = payment.id || 0;
        this.reference = payment.reference;
        this.number = payment.number;
        this.amount = payment.amount;
        this.cancelDate = payment.cancelDate;
        this.accountPaidBefore = payment.accountPaidBefore;
        this.accountPaidAfter = payment.accountPaidAfter;
        this.balanceBefore = payment.balanceBefore;
        this.balanceAfter = payment.balanceAfter;
        this.canceled = payment.canceled;
        this.methodOfPayment = payment.methodOfPayment;
        this.paymentDate = payment.paymentDate;
        this.invoice = payment.invoice;
        this.createBy = payment.createBy;
        this.validateBy = payment.validateBy;
        this.cancelBy = payment.cancelBy;
        this.state = payment.state;
        this.amountInLetter = payment.amountInLetter;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
