import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Customer} from './customer.model';
import {INVOICE_STATE, METHOD_OF_PAYMENT} from '../enums/enums';
import {Order} from './order.model';

@Injectable()
export class Invoice implements Deserializable {

    id?: number;
    number?: string;
    reference?: string;
    quantity?: number;
    unitPrice?: number;
    amount?: number;
    amountInLetter?: string;
    amountPaid?: number;
    stayToPay?: number;
    paid?: boolean = false;
    state?: INVOICE_STATE;
    methodOfPayment?: METHOD_OF_PAYMENT;
    invoiceDate?: Date;
    customer?: Customer;
    order?: Order;

    constructor(invoice?) {
        invoice = invoice || {};
        this.id = invoice.id || 0;
        this.number = invoice.number;
        this.reference = invoice.reference;
        this.quantity = invoice.quantity;
        this.amountInLetter = invoice.amountInLetter;
        this.unitPrice = invoice.unitPrice;
        this.amount = invoice.amount;
        this.amountPaid = invoice.amountPaid;
        this.stayToPay = invoice.stayToPay;
        this.paid = invoice.paid;
        this.state = invoice.state;
        this.methodOfPayment = invoice.methodOfPayment;
        this.invoiceDate = invoice.invoiceDate;
        this.customer = invoice.customer;
        this.order = invoice.order;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
