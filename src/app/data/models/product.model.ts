import {Deserializable} from './deserializable.model';
import {Injectable} from '@angular/core';
import {Category} from './category.model';

export class Product implements Deserializable {

    id?: number;
    designation?: string;
    description?: string;
    reference?: string;
    category?: Category;

    constructor(product?) {
        product = product || {};
        this.id = product.id;
        this.designation = product.designation;
        this.description = product.description;
        this.reference = product.reference;
        this.category = product.category;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    equals(obj: any): boolean {
        return this.id === obj.id;
    }
}
