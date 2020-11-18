import {Deserializable} from './deserializable.model';
import {Privilege} from './privilege.model';

export class Role implements Deserializable {

    name?: string;
    description?: string;
    checked: boolean;
    privileges: Privilege[];

    constructor(role?) {
        role = role || {};
        this.name = role.name;
        this.description = role.description;
        this.checked = role.checked || false;
        this.privileges = role.privileges || [];
    }


    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.name === obj.name;
    }
}
