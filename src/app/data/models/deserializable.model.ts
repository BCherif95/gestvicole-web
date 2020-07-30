export interface Deserializable {
    deserialize(input: any): this;

    equals(obj: this): boolean;
}