import {Injectable} from '@angular/core';
import {Deserializable} from './deserializable.model';

@Injectable()
export class Building implements Deserializable{

    id?: number;
    name?: string;
    description?: string;
    active: boolean = true;
    totalLayer?: number = 0;

    constructor(building?) {
        building = building || {};
        this.id = building.id || 0;
        this.name = building.name;
        this.active = building.active;
        this.description = building.description;
        this.totalLayer = building.totalLayer || 0;
    }


    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }

}