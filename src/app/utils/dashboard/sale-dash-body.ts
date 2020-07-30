import {Deserializable} from '../../data/models/deserializable.model';
import {Injectable} from '@angular/core';
import {GraphBody} from './graph-body';

@Injectable()
export class SaleDashBody implements Deserializable{
    sumAmountPaid?: number = 0;
    sumStayToPay?: number = 0;
    totalOrderCount?: number = 0;
    totalCustomerCount?: number = 0;
    saleGraphBodies?: GraphBody[];

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }
}