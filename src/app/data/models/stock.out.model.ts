import {Deserializable} from './deserializable.model';
import {Product} from './product.model';
import {User} from './user.model';
import {STOCK_OUT_STATE} from '../enums/enums';

export class StockOut implements Deserializable {

    id?: number;
    quantityOut = 0;
    date?: Date;
    product: Product;
    state?: STOCK_OUT_STATE;
    user: User;

    constructor(stockOut?) {
        stockOut = stockOut || {};
        this.id = stockOut.id;
        this.quantityOut = stockOut.quantityOut;
        this.date = stockOut.date;
        this.product = stockOut.product;
        this.state = stockOut.state;
        this.user = stockOut.user;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
