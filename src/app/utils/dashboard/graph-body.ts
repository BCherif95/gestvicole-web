import {Injectable} from '@angular/core';
import {Deserializable} from '../../data/models/deserializable.model';

@Injectable()
export class GraphBody implements Deserializable {

    name?: string;
    value?: number;


    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }

}
