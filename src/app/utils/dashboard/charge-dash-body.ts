import {Deserializable} from '../../data/models/deserializable.model';
import {Injectable} from '@angular/core';
import {LineGraphBody} from './line-graph-body';

@Injectable()
export class ChargeDashBody implements Deserializable{
    sumTotalProd?: number = 0;
    sumTotalLoad?: number = 0;
    sumNetMargin?: number = 0;
    sumTotalEffective?: number = 0;
    lineGraphBodies?: LineGraphBody[];

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }
}