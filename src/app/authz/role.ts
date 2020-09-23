declare type RoleType = 'profile' | 'single';

export class Role {
    private _uniqueName: string;

    static role(name: string, type: RoleType, authorizations: Authorization): Role {
        return new Role(name, type, authorizations);
    }

    static profile(name: string, authorizations: Authorization): Role {
        return Role.role(name, 'profile', authorizations);
    }

    static single(name: string, authorizations: Authorization): Role {
        return Role.role(name, 'single', authorizations);
    }

    private constructor(private _name: string,
                        private _type: RoleType = 'single',
                        private _authorizations: Authorization = {}) {
    }

    isGroup = () => this._type === 'profile';
    isSingle = () => this._type === 'single';

    public hasAuthorization(key: string): boolean {
        return this._authorizations[key];
    }

    get uniqueName(): string {
        return this._uniqueName;
    }

    get type(): RoleType {
        return this._type;
    }

    get authorizations(): Authorization {
        return this._authorizations;
    }

    get name(): string {
        return this._name;
    }
}

export interface Authorization {
    [key: string]: boolean;
}
