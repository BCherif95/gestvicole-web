import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Privilege implements Deserializable {

    name?: string;
    authority?: string;
    checked: boolean;

    constructor(privilege?) {
        privilege = privilege || {};
        this.name = privilege.name;
        this.authority = privilege.authority;
        this.checked = privilege.checked || false;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.name === obj.name;
    }
}
