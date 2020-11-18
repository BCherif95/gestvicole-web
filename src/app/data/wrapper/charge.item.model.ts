import {Deserializable} from './deserializable.wrapper';
import {Injectable} from '@angular/core';
export class ChargeItem implements Deserializable{

    buildingName?: string;
    production?: number;
    total?: number;
    effective?: number;

    constructor(chargeItem?) {
        chargeItem = chargeItem || {};
        this.buildingName = chargeItem.buildingName;
        this.production = chargeItem.production;
        this.total = chargeItem.total;
        this.effective = chargeItem.effective;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}