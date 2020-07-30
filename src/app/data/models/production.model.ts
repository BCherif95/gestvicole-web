import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Building} from './building.model';

@Injectable()
export class Production implements Deserializable{
    id?: number;
    overallProduction?: number = 0;
    mortality?: number = 0;
    generalEffective?: number = 0;
    commercialProductions?: number = 0;
    alveolusBroken?: number = 0;
    prodDoubleYellow?: number = 0;
    prodSmallAlveolus?: number = 0;
    date?: Date = new Date();
    building?: Building;

    constructor(production?) {
        production = production || {};
        this.id = production.id || 0;
        this.overallProduction = production.overallProduction || 0 ;
        this.generalEffective = production.generalEffective || 0;
        this.mortality = production.mortality || 0;
        this.alveolusBroken = production.alveolusBroken || 0;
        this.prodDoubleYellow = production.prodDoubleYellow || 0;
        this.prodSmallAlveolus = production.prodSmallAlveolus || 0;
        this.date = production.date;
        this.commercialProductions = production.commercialProductions || 0;
        this.building = production.building || {};
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }

}