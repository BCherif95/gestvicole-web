import {Deserializable} from './deserializable.model';
import {Product} from './product.model';

export class Stock implements Deserializable {

    id?: number;
    quantityEntry = 0;
    quantityOut = 0;
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
