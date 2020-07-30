import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Charge implements Deserializable {

    id?: number;
    /*prodBuild1?: number;
    prodBuild2?: number;
    totalProdBuild1?: number;
    totalProdBuild2?: number;
    totalProd?: number;
    dayEffectiveBuild1?: number;
    dayEffectiveBuild2?: number;
    totalEffective?: number;
    consumption?: number;;
    totalLoad?: number;
    netMargin?: number;*/
    price?: number;
    costOfDay?: number
    dailyCharge?: number;
    date?: Date = new Date();

    constructor(charge?) {
        charge = charge || {};
        this.id = charge.id;
        /*this.prodBuild1 = charge.prodBuild1;
        this.prodBuild2 = charge.prodBuild2;
        this.totalProdBuild1 = charge.totalProdBuild1;
        this.totalProdBuild2 = charge.totalProdBuild2;
        this.totalProd = charge.totalProd;
        this.dayEffectiveBuild1 = charge.dayEffectiveBuild1;
        this.dayEffectiveBuild2 = charge.dayEffectiveBuild2;
        this.totalEffective = charge.totalEffective;*/
        this.costOfDay = charge.costOfDay;
        this.price = charge.price;
        this.dailyCharge = charge.dailyCharge;
       /* this.totalLoad = charge.totalLoad;
        this.netMargin = charge.netMargin;*/
        this.date = charge.date;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
