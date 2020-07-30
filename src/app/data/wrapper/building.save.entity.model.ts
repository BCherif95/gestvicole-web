import {Deserializable} from './deserializable.wrapper';
import {Injectable} from '@angular/core';
import {Building} from '../models/building.model';
import {LayerType} from '../models/layer.type.model';

@Injectable()
export class BuildingSaveEntity implements Deserializable{

    building?: Building;
    layerTypes?: LayerType[];

    constructor(buildingSaveEntity?) {
        buildingSaveEntity = buildingSaveEntity || {};
        this.building = buildingSaveEntity.building;
        this.layerTypes = buildingSaveEntity.layerTypes;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}