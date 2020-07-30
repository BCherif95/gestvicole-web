import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Product} from './product.model';

@Injectable()
export class StockEntry implements Deserializable {

    id?: number;
    quantityEntry?: number;
    observation?: string;
    date?: Date;
    product: Product;

    constructor(stockEntry?) {
        stockEntry = stockEntry || {};
        this.id = stockEntry.id;
        this.quantityEntry = stockEntry.quantityEntry;
        this.observation = stockEntry.observation;
        this.date = stockEntry.date;
        this.product = stockEntry.product;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
