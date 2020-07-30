import {Injectable} from '@angular/core';
import {Deserializable} from '../../data/models/deserializable.model';

@Injectable()
export class LineGraphBody implements Deserializable {

    name?: string;
    datasets1?: number = 0;
    datasets2?: number = 0;


    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }

}
