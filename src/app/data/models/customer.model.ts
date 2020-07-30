import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Customer implements Deserializable {

    id?: number;
    name?: string;
    mobilePhone?: string;
    homePhone?: string;
    address?: string;

    constructor(customer?) {
        customer = customer || {};
        this.id = customer.id;
        this.name = customer.name;
        this.mobilePhone = customer.mobilePhone;
        this.homePhone = customer.homePhone;
        this.address = customer.address;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
