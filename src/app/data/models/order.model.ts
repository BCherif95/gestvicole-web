import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Customer} from './customer.model';
import {Production} from './production.model';
import {ORDER_STATE} from '../enums/enums';

@Injectable()
export class Order implements Deserializable {

    id?: number;
    number?: string;
    reference?: string;
    quantity?: number;
    unitPrice?: number;
    amount?: number;
    state?: ORDER_STATE;
    orderDate?: Date;
    customer?: Customer;
    production?: Production;

    constructor(order?) {
        order = order || {};
        this.id = order.id || 0;
        this.number = order.number;
        this.reference = order.reference;
        this.quantity = order.quantity;
        this.unitPrice = order.unitPrice;
        this.amount = order.amount;
        this.state = order.state;
        this.orderDate = order.orderDate;
        this.customer = order.customer;
        this.production = order.production;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
