import {Deserializable} from '../../data/models/deserializable.model';
import {Injectable} from '@angular/core';
import {GraphBody} from './graph-body';
import {LineGraphBody} from './line-graph-body';

@Injectable()
export class ProdDashBody implements Deserializable{
    totalProd?: number = 0;
    totalEffective?: number = 0;
    totalMortality?: number = 0;
    totalAlveolusBroken?: number = 0;
    lineGraphBodies?: LineGraphBody[];

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }
}