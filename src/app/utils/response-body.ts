import {Deserializable} from '../data/models/deserializable.model';

export class ResponseBody implements Deserializable {

    status: number;
    message: string;
    response: Object;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: this): boolean {
        return true;
    }
}
