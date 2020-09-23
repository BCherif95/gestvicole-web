import {Injectable} from '@angular/core';
import {RoleDatasource} from './impl/RoleDatasource';
import {navigation} from '../navigation/navigation';
import {ProjectUtils} from '../utils/project-utils';


@Injectable({
    providedIn: 'root'
})
export class RoleHelpers {
    roleItems = [];
    private roles;

    constructor(public roleDatasource: RoleDatasource, public pu: ProjectUtils) {
        this.roleItems = navigation[0].children.reduce((n1, n2) => {
            const ar = n2.type !== 'item' ? (n2.children || []).map(c1 => ({
                role: c1.role,
                url: c1.url
            })) : [{role: n2.role, url: n2.url}];
            return [...n1, ...ar];
        }, []);
        this.roleDatasource.roles$.subscribe(roles => {
            this.roles = roles || [];
        });
    }

    async first(defaultRole?: string): Promise<string> {
        const temp = this.roleDatasource.roles$.getValue();
        if (!temp || temp.length === 0) {
            await this.roleDatasource.load(this.getId().toString());
        }
        const roles = this.roleDatasource.roles$.getValue();
        const r = roles.find(item => defaultRole && item.name === defaultRole);
        if (r) {
            const _r = this.roleItems.find(_ => _.role === r.name);
            if (_r && _r.url) {
                return _r.url;
            }
        }
        const role = roles[0];
        const ri = this.roleItems.find(item => item.role === role.name);
        return ri ? ri.url : '/login';
    }

    private getId(): number {
        const user = this.pu.getAppUser();
        return user ? user.id : 0;
    }

    public hasRole(name, scope): boolean {
        const role = this.roles.find(r => r.name === name);
        if (!role) {
            return false;
        }
        return role.authorizations && role.authorizations[scope];
    }
}
