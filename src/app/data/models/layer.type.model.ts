import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Building} from './building.model';

@Injectable()
export class LayerType implements Deserializable{
    id?: number;
    name?: string;
    description?: string;
    quantity?: number = 0;
    building?: Building;

    constructor(layerType?) {
        layerType = layerType || {};
        this.id = layerType.id || 0;
        this.name = layerType.name ;
        this.description = layerType.description ;
        this.quantity = layerType.quantity || 0;
        this.building = layerType.building || {};
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }

}