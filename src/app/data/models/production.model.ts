import {Deserializable} from './deserializable.model';
import {Building} from './building.model';

export class Production implements Deserializable{
    id?: number;
    overallProduction = 0;
    mortality = 0;
    generalEffective = 0;
    commercialProductions = 0;
    soldProduction = 0;
    alveolusBroken = 0;
    prodDoubleYellow = 0;
    prodSmallAlveolus = 0;
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
        this.soldProduction = production.soldProduction || 0;
        this.building = production.building || {};
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }

}