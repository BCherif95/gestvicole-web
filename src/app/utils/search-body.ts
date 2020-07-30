import {Deserializable} from '../data/models/deserializable.model';
import {Injectable} from '@angular/core';

@Injectable()
export class SearchBody implements Deserializable{

    buildingId?: number;
    date?: Date;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }

}