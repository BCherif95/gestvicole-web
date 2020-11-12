import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Product} from './product.model';

@Injectable()
export class Stock implements Deserializable {

    id?: number;
    quantityEntry?: number = 0;
    quantityOut?: number = 0;
    solde?: number;
    date?: Date;
    product: Product;

    constructor(stock?) {
        stock = stock || {};
        this.id = stock.id;
        this.quantityEntry = stock.quantityEntry;
        this.quantityOut = stock.quantityOut;
        this.solde = stock.solde;
        this.date = stock.date;
        this.product = stock.product;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
